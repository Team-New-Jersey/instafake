var express = require('express');
var router = express.Router();
const models  = require('../db');

module.exports = function(passport) {
	router.get('/', function(req, res) {
		res.render('login');
	});
	router.get('/signup', function(req, res) {
		res.render('signup');
	});
	router.post('/signup', function(req, res, next) {
		passport.authenticate('local-signup', function(err, user, info) {
			if (err) {
			  	return next(err); 
			}
			if (!user) {
			   	return next({ error : true, message : info });
			}
			req.login(user, function(loginErr) {
			   	if (loginErr) {
			     	return next(loginErr);
			   	}
			 	return res.redirect('/api/');
			}); 
		})(req, res, next);
	});

	router.post('/', function(req, res, next) {
		passport.authenticate('local-login', function(err, user, info) {
			if (err) {
			  	return next(err); 
			}
			if (! user) {
			   	return next({ error : true, message : info });
			}
			req.login(user, function(loginErr) {
			    if (loginErr) {
					return next(loginErr);
			    } 

				res.cookie('jwt', user.token);
				res.cookie('username', user.username);
				res.cookie('userid', user.id);
 
				return res.redirect('/api/protected/');
			}); 
		})(req, res, next);
	});
  	return router;
};


