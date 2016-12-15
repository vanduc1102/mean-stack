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