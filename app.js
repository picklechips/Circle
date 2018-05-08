const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const path = require('path');
const multer  = require('multer');
const methodOverride = require('method-override')

// Load helper funcs
const {
	truncate,
	stripTags,
	formatDate,
	formatImage,
	select,
	ifNotEq,
	ifEq
} = require('./helpers/hbs');

const app = express();

// Passport Config
require('./config/passport')(passport);

// Connect to mongodb
const db = require('./config/database');
mongoose.connect(db.mongoURI)
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

// Module Middleware
app.engine('handlebars', exphbs({
	helpers: {
		truncate: truncate,
		stripTags: stripTags,
		formatDate: formatDate,
		formatImage: formatImage,
		select: select,
		ifNotEq: ifNotEq,
		ifEq: ifEq
	},
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
	secret: 'ryanisthebest',
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// GLOBALS
app.use(function(req, res, next) {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
});

// use routes
const users = require('./routes/users')
const index = require('./routes/index')
const posts = require('./routes/posts')
app.use('/users', users);
app.use('/', index);
app.use('/posts', posts)

const port = process.env.PORT || 3000; // production vs dev
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});