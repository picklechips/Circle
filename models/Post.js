const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	title: {
		type: String,
	},
	body: {
		type: String,
		required: true
	},
	status: {
		type: String,
		default: 'public'
	},
	image: {
		type: String
	},
	comments: [{
		commentBody: {
			type: String,
			required: true
		},
		commentUser: {
			type: Schema.Types.ObjectId,
			ref:'users'
		}
	}, {timestamps:true}],
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	}
}, {timestamps:true})

mongoose.model('posts', PostSchema);