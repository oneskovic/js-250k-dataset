/**
 * Security hook.
 */
function isAllowed(action){
	if(action == 'login' || action == 'new_user' || action == 'authenticate')
		return true;

	return (session.user instanceof AXSuperUser);
}

/**
 * Unauthorized handler
 */
function unauthorized(){
	var error = '';
	var came_from = req.get('http_referer');
	if(came_from && came_from.match(/login$/)){ error='?error=true';}
	res.redirect(this.getURI('login'+error));
}

/**
 * If an admin account has been created, return the login screen,
 * otherwise return the admin account creation screen.
 */
function login(){
	var action = (app.getHits('AXSuperUser', {}).length == 0) ? 'create_user' : 'login_screen';
	return this.wrap({content: action});
}

/**
 * Validates username and password, logs in user if correct.
 */
function authenticate(){
	var user_hits = app.getHits('AXSuperUser', {username: req.data.username, password: req.data.password.md5()});
	if(user_hits.length == 0){
		this.unauthorized();
	} else {
		session.login(user_hits.objects(0,1)[0]);
		res.redirect(this.getURI());
	}

}

/**
 * Logout the current user.
 */
function logout(){
	session.logout();
	res.redirect(this.getURI('login'));
}