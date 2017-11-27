const mongoose = require('mongoose')
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const Task = require('../models/task');
const ObjectId = require('mongodb').ObjectId
require('dotenv').config()
const FB = require('fb')

function signUp(req,res){
	let user = new User({
		fbId : null,
		name : req.body.name,
		username : req.body.username,
		password : req.body.password,
		email : req.body.email,
		task  : [],
		createdAt : Date.now()})
	user.save((err,user) => {
		if(err){
			let tempMessage = err.message.split("key: ");
			tempMessage = tempMessage[tempMessage.length-1];
			msg = tempMessage.slice(4, tempMessage.length-1)
			err.message = msg
			res.status(500).send(err);
		}else{
			res.send(user);
		}
	})
}

function signIn(req,res){
	User.findOne({
		username : req.body.username
	},(err,user) => { 
		if (!user){
			res.status(500).send(err);
		}else
		bcrypt.compare(req.body.password, user.password, (err,result) => {
			if(result){
				jwt.sign({
					id : ObjectId(user._id),
					username : user.username,
					email : user.email
				}, process.env.SECRET_KEY , (err,token) => {
					res.send({ user, message : "login success", token : token})
				})
			}else{
				res.status(500).send(err)
			}			
		})
	})
}

function signInFacebook(req,res){
	FB.setAccessToken(req.body.accessToken);
	FB.api('/me', { fields: ['id', 'name', 'picture.width(150).height(150)', 'email'] }, function (response) {
		if(!res || res.error) {
			console.log(!response ? 'error occurred' : response.error);
			return;
		}
		if(response){
			User.findOne({
				fbId : response.id
			}).then(user => {
				if(user){
					jwt.sign({
						id : user.id,
						username : user.name,
					}, process.env.SECRET_KEY , (err,token) => {
						res.send({ response, message : "login success", token : token, userId : user._id})
					})	
				}else{
					console.log(response)
					let user = new User({
						fbId : response.id,
						name : response.name,
						username : response.name,
						password : response.id,
						email : response.email,
						task  : [],	
						createdAt : Date.now()
					})	
					user.save((err, user) => {
						if(err){
							console.log(err)
							res.status(500).send(err)	
						}else{
							jwt.sign({
								id : user.id,
								username : user.name,
							}, process.env.SECRET_KEY , (err,token) => {
								res.send({ response, message : "login success", token : token, userId : user._id})
							})	
						}

					})						
				}				
			}).catch((err) => {
				res.status(500).send(err)
			})
		}
		// console.log(res.id);
		// console.log(res.name);
		// console.log(res.picture)
	});


}

function findAll(req,res) {
	User.findOne({
		_id : ObjectId(req.headers.id)
	}).populate('task').exec()
	.then(allTask => {
		res.send(allTask);
	})
	.catch(err => {
		res.status(500).send({err: err.errmsg})
	})
}

function create(req,res) {	
	User.findOne({
		_id : ObjectId(req.headers.id)
	}).then(user => {
		let task = new Task({
			userId : req.headers.id,
			taskname : req.body.taskname,
			// tags : req.body.tags,
			status : false,
			createdAt : Date.now(),
			finishDate : null
		})
		task.save((err, task) => {
			if(err){
				res.status(500).send({err : err.errmsg})
			}else{
				user.task.push(task)
				user.save()
				res.send(task);
			}
		})
	})
}

module.exports = {
	signUp,
	signIn,
	create,
	findAll,
	signInFacebook
}