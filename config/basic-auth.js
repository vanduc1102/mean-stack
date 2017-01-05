module.exports = {
	basicAuth: basicAuth,
	checkAuthentication: checkAuthentication
}
function basicAuth(req, res, next){
	const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
	const [login, password] = new Buffer(b64auth, 'base64').toString().split(':');

	// Verify login and password are set and correct
	if (!login || !password || !checkAuthentication(login, password)) {
		res.set('WWW-Authenticate', 'Basic realm="Mean Stack Realm"') // change this
		res.setHeader("Content-Type", "text/html");
		res.status(401).send('<h1>This page need authentication</h1>') // custom message
	}else{
		next();
	}

}

function checkAuthentication(username, password){
	var userList = [{login: 'admin', password: '123456'},{login:'user',password:'123456'}];
	for(var i = 0 ; i < userList.length ; i++){
		if(userList[i].login == username && userList[i].password == password){
			return true;
		}
	}
	return false;
}