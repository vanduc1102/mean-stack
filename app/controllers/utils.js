function getUserLogin(req){
	const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
	const [login, password] = new Buffer(b64auth, 'base64').toString().split(':');
	return login;
}

module.exports = {
	getUserLogin:getUserLogin
}