const mongoose = require('mongoose')
const User = require('../models/user');
const Task = require('../models/task');
const ObjectId = require('mongodb').ObjectId


function findOne(req,res) {
	Task.find({
		_id : ObjectId(req.params.taskId)
	}).populate('userId').exec()
	.then(task => {
		res.send(task);
	})
	.catch(err => {
		res.status(500).send({err: err.errmsg})
	})
}

function findOneTask(req,res) {
	Task.findOne({
		_id : ObjectId(req.params.taskId)
	}).populate('userId').exec()
	.then(task => {
		res.send(task);
	})
	.catch(err => {
		res.status(500).send({err: err.errmsg})
	})
}

function update(req,res) {
	Task.findOne({
		_id : req.params.taskId,
		userId : req.headers.id
	}, (err, task) => {
		if(task){
			task.set({
				userId : task.userId,
				taskname : req.body.taskname || task.taskname,
				tags : req.body.tags || task.tags,
				status : task.status,
				createdAt : task.createdAt,
				finishDate : task.finishDate
			})
			task.save((err, updatedTask) => {
				if(err){
					res.status(500).send(err);
				}else{
					res.send(updatedTask);
				}
			})
		}else{
			res.status(500).send({err : "no authorized or you dont have this task"});
		}
	})
}

function remove(req,res) {
	Task.findOne({
		_id: req.headers.taskid
	})
	.then(result => {
		Task.remove({
			_id : ObjectId(req.headers.taskid),
			userId : ObjectId(req.headers.id)
		}, (err, task) => {
			if(err){
				res.status(500).send(err)
			}else{
				// console.log(task)
				res.send(result)
			}
		})
	})
}

function done(req,res) {
	Task.findOne({
		_id : req.params.taskId,
		userId : req.headers.id
	}, (err, task) => {
		if(task){
			task.set({
				userId : task.userId,
				taskname : task.taskname,
				tags : task.tags,
				status : true,
				createdAt : task.createdAt,
				finishDate : Date.now()				
			})
			task.save()



			User.findOne({
				_id : ObjectId(req.headers.id)
			}).populate('task').exec()
			.then(allTask => {
				res.send(allTask);
			})
			.catch(err => {
				res.status(500).send({err: err.errmsg})
			})	



		}else{
			res.status(500).send(err)
		}
	})	
}

function unDone(req,res) {
	Task.findOne({
		_id : req.params.taskId,
		userId : req.headers.id
	}, (err, task) => {
		if(task){
			task.set({
				userId : task.userId,
				taskname : task.taskname,
				tags : task.tags,
				status : false,
				createdAt : task.createdAt,
				finishDate : null				
			})
			task.save()
			User.findOne({
				_id : ObjectId(req.headers.id)
			}).populate('task').exec()
			.then(allTask => {
				res.send(allTask);
			})
			.catch(err => {
				res.status(500).send({err: err.errmsg})
			})				
		}else{
			res.status(500).send(err)
		}
	})	
}

module.exports = {
	findOne,
	update,
	remove,
	done,
	unDone,
	findOneTask
}