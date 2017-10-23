var express = require('express');
var router = express.Router();

module.exports = function(passport) {
	router.post('./', passport.authenticate('signup'), function(req, res) {        
		res.json({user: req.user}) // <<-- passport will add this to the req 
		//not res.json
		res.redirect('/home');    
	});

	// login
	// router.get

};

// Sign in needs thumbnail upload option


// Modify passport-local:
// 