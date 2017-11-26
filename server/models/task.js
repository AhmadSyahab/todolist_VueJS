const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const taskSchema = new Schema({
	userId : {
		type : Schema.Types.ObjectId, ref: 'user',
	},
	taskname : {
		type : String,
		required : true
	},
	status : {
		type : Boolean,
		default : false
	},
	tags : {
		type : Array
	},
	createdAt : {
		type : Date,
		default : Date.now()
	},
	finishDate : {
		type : Date
	}
})


const taskModel = mongoose.model('task',taskSchema);

module.exports = taskModel
