var userController = require('../controllers/user-controller.js');
module.exports = function (app){
	app.route('/user')
	.post(userController.create)
	.get(userController.list);
	app.get('/user/:userId',userController.find);
	return app;
}