const jwt = require('jsonwebtoken');
require('dotenv').config()
const ObjectId = require('mongodb').ObjectId
const Task = require('../models/task');

function isSignIn(req,res,next) {
	console.log(req.body)
	if(!req.headers.token){
		req.headers.token = req.body.token
	}
	console.log(req.headers.token)
	jwt.verify(req.headers.token , process.env.SECRET_KEY , function(err, decoded) {
		if(err){
			res.status(500).send(err)
		}else{
			req.headers.id = decoded.id
			req.headers.username = decoded.username
			req.headers.email = decoded.email
			next()	
		}
	});

// invalid token - synchronous
}

function checkOwner(req,res,next) {
	Task.findOne({
		_id : ObjectId(req.params.taskId)
	}).then(result => {
		// console.log(result.userId,req.headers.id)
		if(result.userId == req.headers.id){
			next()
		}else{
			res.send({message : "you cant access"})
		}
	}).catch(err => {
		res.status(500).send({message : "cant found that task"})
	})
}
module.exports ={
	isSignIn,
	checkOwner
}