var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
User = require('mongoose').model('User');

module.exports = function(){
	passport.use(new LocalStrategy(function(username, password, done){
		console.log("LocalStrategy get username and password ", username, password);
		User.findOne({
			username: username
		}, function(err, user){
			console.log("found user from database : ", user);
			if(err){
				return done(err);
			}
			if(!user){
				return done(null, false, {
					message: 'Unknown user'
				});
			}
			if(!user.authenticate(password)){
				return done(null, {
					message: 'Invalid password'
				});
			}
			return done(null, user);
		});
	}));
}