var express = require('express');
var router = express.Router();

module.exports = function(passport) {
	router.get('/home', require('connect-ensure-login').ensureLoggedIn(), function(req, res){
    	res.render('home', { user: req.user });
  	});
	router.get('/logout', function(req, res){
    	req.logout();
    	res.redirect('/');
  	});
  	return router;
};