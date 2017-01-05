var express = require("express"),
	morgan = require("morgan"),
	compress = require("compression"),
	bodyParser = require("body-parser"),
	methodOverride = require('method-override'),
	session = require('express-session'),
	passport = require('passport'),
	config = require('./config');

module.exports = function (){
	var app = express();
	console.log("You are running NodeJS server on ["+process.env.NODE_ENV+"] mode.");
	if(process.env.NODE_ENV === 'development'){
		app.use(morgan('dev'));
	}else if(process.env.NODE_ENV === 'production'){
		app.use(compress());
	}

	app.use(bodyParser.urlencoded({
		extended:true
	}));

	app.use(bodyParser.json());
	app.use(methodOverride());

	app.use(session({
		name:'mean-stack-server',
		saveUninitialized:true, 
		resave:true, 
		secret: config.sessionSecret
	}));

	app.set('views','./app/views');
	app.set('view engine', 'ejs');

	app.use(passport.initialize());
	app.use(passport.session());
	//app.use(basicAuth);
	require('../app/routers/router.js')(app);

	app.use(express.static('./public'));
	return app;
}

