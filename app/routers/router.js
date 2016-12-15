var userController = require('../controllers/user-controller.js');
var urlController = require('../controllers/url-controller.js');
module.exports = function (app){
	app.route('/user')
	.post(userController.create)
	.get(userController.list);
	app.get('/user/:userId',userController.find);

	app.post('/shortener',urlController.create);
	app.get('/shortener',urlController.list);
	app.get('/shortener/:shortenerText',urlController.find);
	return app;
}