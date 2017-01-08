var User = require('mongoose').model('User');
exports.create = function(req, res, next){
	var user = new User(req.body);
	user.save(function(err){
		if(err){
			console.log("Can not save user :", req.body);
			next(err);
		}else{
			res.json(user);
		}
	})
}

var getErrorMessage = function (err){
	var message = '';
	if(err.code){
		switch(err.code){
			case 11000:
			case 11001:
				message = 'Username already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	}else{
		for(var errName in err.errors){
			if(err.errors[errName].message){
				message = err.errors[errName].message;
			}
		}
	}
	return message;
}

exports.find = function(req, res, next, id) {
	var userId = req.params.id;
	User.findOne({
		_id: userId
	}, function(err, user) {
		if (err) {
			next(err);
		} else {
			req.user = user;
			next();
		}
	});
};



exports.list = function(req, res, next) {
	User.find({}, function(err, users) {
		if (err) {
			next(err);
		} else {
			res.json(users);
		}
	});
};

exports.logout= function (req, res, rext){
	res.logout();
	res.redirect('/logout');
}

exports.signup = function (req, res, next){
	if(!req.user){
		var user = new User(req.body);
		var message = null;
		user.provider = 'local';
		user.save(function(err) {
			if (err) {
				var message = getErrorMessage(err);
				req.flash('error', message);
				return res.redirect('/signup');
			}
			res.statusCode(201);
			res.json({
				successful:true
			});
			// req.login(user, function(err) {
			// 	if (err) return next(err);
			// 	return res.redirect('/');
			// });
		});
	}else{
		return res.redirect('/');
	}
}