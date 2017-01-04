var Url = require('mongoose').model('Url');
var Counter = require('mongoose').model('Counter');
var base58 = require('./base58');
var utils = require('./utils');
exports.create = function(req, res, next){
	var logedUser = utils.getUserLogin(req);
	if(req.body.custom){
		console.log("create url with custom");
		Url.findOne({
			shortened: req.body.custom,
			username:logedUser
		}, function(err, url) {
			console.log("error : ",err);
			if (!url) {
				var url = new Url(req.body);
				url.shortened =  req.body.custom;
				url.createdAt = new Date();
				url.save(function(err){
					if(err){
						console.log("Can not save url :", req.body);
						next(err);
					}else{
						res.json(url);
					}
				});
			} else {
				res.statusCode = 400;
				res.end();
			}
		});
	}else{
		Url.find({
			username:logedUser,
			originUrl:req.body.originUrl
		}, function(err, listUrl){
			if(!listUrl || listUrl.length == 0){
				Counter.findOne({},function(err, count){
				    if(!count){
				    	var saveCount = new Counter({
				    		seq:1
				    	});
				    	var url = new Url(req.body);	
						url.shortened = base58.encode(1);
						url.createdAt = new Date();
						url.username = logedUser;
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
				    	var newCounter = count.seq + 1;	
						url.shortened = base58.encode(newCounter);
						url.createdAt = new Date();
						url.username = logedUser;
						var saveCount = count;
						saveCount.seq = newCounter;
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
			}else{
				res.statusCode = 400;
				res.end();
			}
		});
		
	}	
	
}
exports.find = function(req, res, next) {
	var urlShorted = req.params.shortenerText;
	Url.findOne({
		shortened: urlShorted
	}, function(err, url) {
		if (err) {
			//next(err);
			console.log(err);
			res.setHeader('Content-Type', 'text/html');
    		res.send( "Url does not exist.");
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

exports.deleteUrl = function(req, res) {
	var urlId = req.params.urlId;
	var logedUser = utils.getUserLogin(req);
	Url.remove({ _id: urlId , username : logedUser}, function(err) {
	    if (!err) {	 
	    	res.statusCode = 200;          
	    }
	    else {	       
	    	res.statusCode = 400;      
	    }
	    res.end();
	});
};

exports.list = function(req, res, next) {
	var logedUser = utils.getUserLogin(req);
	Url.find({username : logedUser}, function(err, urls) {
		if (err) {
			next(err);
		} else {
			res.json(urls);
		}
	});
};