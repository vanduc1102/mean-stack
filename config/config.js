var path = require('path');
module.exports = function(){
	return require(path.join(__dirname, 'env', process.env.NODE_ENV + '.js'));
}