var Url = require('mongoose').model('Url');
var Counter = require('mongoose').model('Counter');
var base58 = require('./base58');
exports.create = function(req, res, next){
	Counter.find({}).sort('-date').limit(10).exec(function(err, count){
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
			url.shortened = base58.encode(count[count.length - 1].seq);
			url.createdAt = new Date();

			var saveCount = new Counter({
	    		seq: (count[count.length - 1].seq + 1)
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
		} else {
			//req.url = url;
			res.redirect(url.originUrl);
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