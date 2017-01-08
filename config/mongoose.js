var config = require('./config'),
	mongoose = require('mongoose');
mongoose.Promise = global.Promise;
module.exports = function() {
	var db = mongoose.connect(config.db, function(err){
		if(err){
			console.log("Can not connect to : "+ config.db);
		}else{
			console.log("Connection successful with MongoDB.");
		}
	});
	require('../app/models/user-model');
	require('../app/models/counter-model');
	require('../app/models/url-model');
	return db;
};