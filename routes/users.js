const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();

// Load model
require('../models/User');
const User = mongoose.model('users');


// LOGIN ROUTES
router.get('/login', (req, res) => {
	res.render('users/login');
});

router.post('/login', (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: '/dashboard',
		failureRedirect: '/users/login',
		failureFlash: true
	})(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
	req.logout();
	req.flash('success_msg', 'You are logged out');
	res.redirect('/users/login');
});

// REGISTER ROUTES
router.get('/register', (req, res) => {
	if (req.user) {
		req.flash('error_msg', 'You must logout first');
		res.redirect('/dashboard')
	}
	else {
		res.render('users/register');
	}
});

router.post('/register', (req, res) => {
	let errors = [];

	if(req.body.password != req.body.password2) {
		errors.push({text: 'Passwords do not match'});
	}
	if (req.body.password.length < 4) {
		errors.push({text: 'Password must be at least 4 characters'});
	}
	if (errors.length > 0){
		res.render('users/register', {
			errors: errors,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: req.body.password,
			password2: req.body.password2
		});
	}
	else {
		User.findOne({
			email: req.body.email
		}).then(user => {
			if(user) {
				req.flash('error_msg', 'Email already in use');
				res.redirect('/users/register');
				return;
			}
			else {
				const newUser = new User({
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					email: req.body.email,
					password: req.body.password
				});
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if (err) throw err;
						newUser.password = hash;
						newUser.save()
							.then(user => {
								req.flash('success_msg', 'You are now registered and can log in');
								res.redirect(307, '/users/login');
							})
							.catch(err => {
								console.log(err);
								return;
							});
					});
				});
			}
		});
	}
});

module.exports = router;