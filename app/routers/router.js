var userController = require('../controllers/user-controller.js');
var urlController = require('../controllers/url-controller.js');
var passport = require('passport');

module.exports = function (app){
	app.route('/user')
	.post(userController.create)
	.get(userController.list);

	app.post('/signup', userController.signup);

	app.route('/signin')
			.post(passport.authenticate('local', {
				successRedirect: '/',
				failureRedirect: '/signin',
				failureFlash: true
			}));

	app.get('/user/:userId',userController.find);

	app.post('/shortener',urlController.create);
	app.get('/shortener',urlController.list);	
	app.delete('/shortener/:urlId',urlController.deleteUrl);
	app.get('/shortener/:shortenerText',urlController.find);
	return app;
}