var userController = require('../controllers/user-controller.js');
var urlController = require('../controllers/url-controller.js');
var passport = require('passport');

module.exports = function (app){
	app.route('/user')
	.post(userController.create)
	.get(userController.list);

	app.post('/signup', userController.signup);
	app.post('/signin', userController.authenticate);
	app.get('/logout', userController.logout);

	app.get('/user/:userId',userController.find);

	app.post('/shortener',urlController.create);
	app.get('/shortener',urlController.list);	
	app.delete('/shortener/:urlId',urlController.deleteUrl);
	app.get('/shortener/:shortenerText',urlController.find);
	return app;
}