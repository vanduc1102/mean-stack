var mongoose = require("mongoose"),
Schema = mongoose.Schema;

var CounterSchema = new Schema({
	seq: {
		type:Number, 
		default:0
	}
});

mongoose.model('Counter', CounterSchema);