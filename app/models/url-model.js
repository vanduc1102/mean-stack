var mongoose = require("mongoose"),
Schema = mongoose.Schema;

var UrlSchema = new Schema({
	originUrl: String,
	shortened:{
		type:String,
		index: true
	},
	username:String,
	counter:{
		type:Number,
		default:0
	},
	createdAt: Date
});

mongoose.model('Url', UrlSchema);