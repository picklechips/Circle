const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {

	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	image: {
		type: String
	}
}, {timestamps:true})

mongoose.model('users', UserSchema);