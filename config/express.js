var express = require("express"),
	morgan = require("morgan"),
	compress = require("compression"),
	bodyParser = require("body-parser"),
	methodOverride = require('method-override'),
	session = require('express-session'),
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
	app.use(basicAuth);
	require('../app/routers/router.js')(app);

	app.use(express.static('./public'));
	return app;
}

function basicAuth(req, res, next){
	const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
	const [login, password] = new Buffer(b64auth, 'base64').toString().split(':');

	// Verify login and password are set and correct
	if (!login || !password || !checkAuthentication(login, password)) {
		res.set('WWW-Authenticate', 'Basic realm="Mean Stack Realm"') // change this
		res.setHeader("Content-Type", "text/html");
		res.status(401).send('<h1>This page need authentication</h1>') // custom message
	}else{
		next();
	}

}

function checkAuthentication(username, password){
	var userList = [{login: 'admin', password: '123456'},{login:'user',password:'123456'}];
	for(var i = 0 ; i < userList.length ; i++){
		if(userList[i].login == username && userList[i].password == password){
			return true;
		}
	}
	return false;
}