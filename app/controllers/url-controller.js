var Url = require('mongoose').model('Url');
var Counter = require('mongoose').model('Counter');
var base58 = require('./base58');
exports.create = function(req, res, next){
	Counter.find({}).sort('-date').limit(10).exec(function(err, count){
		console.log("cpinter : ",count);
	    if(count && count.length == 0){
	    	var saveCount = new Counter({
	    		seq: 1
	    	});
	    	var url = new Url(req.body);	
			url.shortened = base58.encode(1);
			url.createdAt = new Date();
	    	saveCount.save(function(){
	    		url.save(function(err){
					if(err){
						console.log("Can not save url :", req.body);
						next(err);
					}else{
						res.json(url);
					}
				})
	    	});
	    }else{	    	
	    	var url = new Url(req.body);
	    	var newCounter = count[count.length - 1].seq + 1;	
			url.shortened = base58.encode(newCounter);
			url.createdAt = new Date();

			var saveCount = new Counter({
	    		seq: newCounter
	    	});
	    	saveCount.save(function(){
	    		url.save(function(err){
					if(err){
						console.log("Can not save url :", req.body);
						next(err);
					}else{
						res.json(url);
					}
				})
	    	});
	    }
	});
	
}
exports.find = function(req, res, next) {
	var urlShorted = req.params.shortenerText;
	Url.findOne({
		shortened: urlShorted
	}, function(err, url) {
		if (err) {
			//next(err);
			console.log(err);
			res.end();
		} else {

			Url.update({
				shortened: urlShorted
			 }, { counter: (url.counter + 1)}, function(){
			 		res.redirect(url.originUrl);
			 })
			//req.url = url;
			
			//res.
		}
	});
};

exports.list = function(req, res, next) {
	Url.find({}, function(err, urls) {
		if (err) {
			next(err);
		} else {
			res.json(urls);
		}
	});
};