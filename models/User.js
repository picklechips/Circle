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
	intro: {
		type: String
	},
	image: {
		type: Buffer
	}
}, {timestamps:true})

mongoose.model('users', UserSchema);