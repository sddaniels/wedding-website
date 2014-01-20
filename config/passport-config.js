var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {

	if (id == 42) {
		return done(null, getUser()); 
	}

  	done('Could not find user.');
});

passport.use(new LocalStrategy(function(username, password, done) {
	
	if (username == 'sddaniels' && password == 'password') {	
		return done(null, getUser());
	}
	
	return done(null, false, { message: 'Either the username or password you entered was incorrect.' });
}));

exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {

	if (req.isAuthenticated()) { 
		return next(); 
	}

	res.redirect('/admin');
}

function getUser() {
	
	var user = {
		id: 42,
		username: 'sddaniels',
		name: 'Shea'
	};	
	
	return user;
}