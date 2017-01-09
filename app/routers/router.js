var userController = require('../controllers/user-controller.js');
var urlController = require('../controllers/url-controller.js');
var passport = require('passport');

module.exports = function (app){
	app.route('/user')
	.post(userController.create)
	.get(userController.list);

	app.post('/signup', userController.signup);
	app.post('/signin', function(req, res, next) {
	  passport.authenticate('local', function(err, user, info) {
	    if (err) { 
	    	return res.status(401).send("Authentication failure.");
	    }
	    if (!user) { 
	    	return res.status(401).send("Authentication failure."); 
	    }
	    res.status(200).json({
	    	isSuccessful:true,
	    	data:''
	    });
	  })(req, res, next);
	  
	});

	app.get('/user/:userId',userController.find);

	app.post('/shortener',urlController.create);
	app.get('/shortener',urlController.list);	
	app.delete('/shortener/:urlId',urlController.deleteUrl);
	app.get('/shortener/:shortenerText',urlController.find);
	return app;
}