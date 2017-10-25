var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var saltRounds = require('../config/config');
var User = require("../db").users;

module.exports = function(passport) {   
	passport.serializeUser(function(user, done) {      
		done(null, user.user_id);    
	}); 
	passport.use('local-signup', new LocalStrategy({
	        usernameField: 'username',        
	        passwordField: 'password',        
	        passReqToCallback: true    
	}, processSignupCallback));   // <<-- more on this to come
	passport.use('local-login', new LocalStrategy({        
		usernameField : 'username',        
		passwordField : 'password'    
	}, processLoginCallback));
};

function processSignupCallback(request, username, password, done) {
// first search to see if a user exists in our system with that username   
	User.findOne({ // THE SLIDES USE UserModel, I CHANGED IT TO USER BC OF LINE 3, SAME FOR LINE 31
		where: { 
			'username' :  username         
		},        
			attributes: ['user_id']    
		})    
		.then(function(user) {
			if (user) {
			// user exists call done() passing null and false
				return done(null, false);        
			} else {
			// create the new user
				var userToCreate = request.body; // CHANGED req TO request, LINE 15 USES REQUEST

				bcrypt.hash(userToCreate.password, saltRounds.saltRounds, function(err, hash) {               
			  		userToCreate.password = hash;               
			  		User.create(userToCreate)               
			  		.then(function(createdRecord) {                    
			  			createdRecord.password = undefined;
			  			return done(null, createdRecord);               
			  		});            
			  	});        
			}    
		});
};

function processLoginCallback(username, password, done) {
// first let's find a user in our system with that username    
	User.findOne({        
		where: { 
			'username' :  username         
			}    
		})    
		.then(function(user) {
			if (!user) {
				return done(null, false)        
			}
			// make sure the password they provided matches what we have
			// (think about this one, before moving forward)        
			bcrypt.compare(password, user.password, function(err, result) {            
				user.password = undefined;
				return result ? done(null, user) : done(null, false);        
			});    
		});
	};