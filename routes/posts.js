const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {isAuth} = require('../helpers/auth');

// Load models
require('../models/Post');
const Post = mongoose.model('posts');
require('../models/User');
const User = mongoose.model('users');

router.get('/', isAuth, (req, res) => {
	Post.find({status: 'public'})
		.then(posts => {
			res.render('posts/index', {
				posts: posts
			});
		});
});

router.get('/add', isAuth, (req, res) => {
	res.render('posts/add');
});

router.post('/', isAuth, (req, res) => {
	const newPost = {
		title: req.body.title,
		body: req.body.body,
		status: req.body.status,
		user: req.user.id
	}

	new Post(newPost)
		.save()
		.then( post => {
			res.redirect(`/posts/show/${post.id}`)
		})
		.catch(err => {
			if (err) throw err;
		});
});

router.get('/show/:id', isAuth, (req, res) => {
	Post.findOne({
		_id: req.params.id
	})
	.populate('user')
	.then(post => {
		res.render('posts/show', {
			post: post
		});
	});
});

router.get('/edit/:id', isAuth, (req, res) => {
	Post.findOne({
		_id: req.params.id
	})
	.then(post => {
		res.render('posts/edit', {
			post: post
		});
	});
});

router.put('/:id', isAuth, (req, res) => {
	Post.findOne({
		_id: req.params.id
	})
	.then(post => {
		post.title = req.body.title;
		post.body = req.body.body;
		post.status = req.body.status;

		post.save().then(post => {
			res.redirect('/dashboard');
		});
	})
});

module.exports = router;