const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {isAuth} = require('../helpers/auth');

require('../models/Post');
const Post = mongoose.model('posts');
require('../models/User');
const User = mongoose.model('users');

// index route
router.get('/', (req, res) => {
	if (!req.user) {
		res.redirect('/users/register');
	}
	else {
		res.redirect('dashboard');
	}
});

router.get('/dashboard', isAuth, (req, res) => {
	Post.find({status: 'public'})
		.sort('-createdAt')
		.populate('user')
		.then(posts => {
			res.render('dashboard', {
				posts: posts
			});
		});
});

module.exports = router;