var express = require('express');
var router = express.Router();


module.exports = function(passport) {
	router.get('/', function(req, res) {
		res.render('login');
	});
	router.get('/signup', function(req, res) {
		res.render('signup');
	});
	router.post('/signup', passport.authenticate('local-signup'), function(req, res) {        
		console.log("Signed up");
		res.redirect('/');    
	});
	router.post('/', passport.authenticate('local-login', { failureRedirect: '/' }), function(req, res) {
    	res.render('home', { user: req.user });
  	});
  	return router;
};
