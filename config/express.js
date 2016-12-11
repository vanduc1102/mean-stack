var express = require("express");
module.exports = function (){
	var app = express();
	require("../app/routers/routers.js")(app);
	return app;
}