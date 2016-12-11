var controller = require("../controllers/controller.js");
module.exports = function (app){
	app.get("/", controller.render);
	return app;
}