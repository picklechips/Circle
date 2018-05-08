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
	.populate('comments.commentUser')
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

router.delete('/:id', isAuth, (req, res) => {
	Post.remove({_id: req.params.id})
	.then(() => {
		res.redirect('/dashboard');
	})
});

router.delete('/:postId/comment/:commentId', isAuth, (req, res) => {
	Post.findOne({
		_id: req.params.postId
	}).then(post => {
		post.comments.pull(req.params.commentId);
		post.save().then((post) => {
			res.redirect(`/posts/show/${post.id}`)
		});
	});
});

router.post('/comment/:id', isAuth, (req, res) => {
	Post.findOne({
		_id: req.params.id
	}).then(post => {
		const newComment = {
			commentBody: req.body.commentBody,
			commentUser: req.user.id
		}

		post.comments.unshift(newComment);
		post.save().then(post => {
			res.redirect(`/posts/show/${post.id}`);
		});
	});
});

module.exports = router;