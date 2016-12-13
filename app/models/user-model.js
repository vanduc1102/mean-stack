var mongoose = require("mongoose"),
Schema = mongoose.Schema;

var UserSchema = new Schema({
	firstName:String,
	lastName:String,
	email:String,
	username:String,
	password:String,
	birthDate:Date,
	city:String,
	address:String,
	country:String,
});

mongoose.model('User', UserSchema);