var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var User = require("../db").users;

function getUserParams(req) {
	var body = req.body
	return {
		id: body.id,
		username: body.username,
		password: body.password
	};
}

function initializeSerialization(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
}
function processSignupCallback(req, username, password, done) {
	User.findOne({
		where: { 
			'username' :  username         
		},        
			attributes: ['id']    
		})    
			.then(function(user) {
				if (user) {
					return done(null, false);        
				} else {
					var userToCreate = getUserParams(req);

					bcrypt.hash(userToCreate.password, config.saltRounds, function(err, hash) {       

				  		userToCreate.password = hash;           

				  		User.create(userToCreate)               
				  			.then(function(createdRecord) {
				  				jwt.sign({id: createdRecord.id}, 
	            				config.jwtSecret, {
	              					expiresIn: config.jwtExpiration
	            				}, function(err, token) {
	              					createdRecord.token = token;
	              					createdRecord.password = password;
	             	 				return done(null, createdRecord);
	               			});
          			});
      		});
    	}
  	});
}

function processLoginCallback(username, password, done) {
   
	User.findOne({        
		where: { 
			'username' :  username         
			}    
		})    
		.then(function(user) {
			if (!user) {
				return done(null, false)        
			}
			bcrypt.compare(password, user.password, function(err, result) {            
				user.password = undefined;
				if (err) {
          			return done(null, false, err)
        		} else if (!result) {
          			return done(null, false, "Invalid Password for provided email")
        		} else {
          			jwt.sign({id: user.id}, config.jwtSecret, {expiresIn: config.jwtExpiration}, function(err, token) {
            		user.token = token;
           			user.save()
            			.then(function(savedRecord) {
              				return done(null, savedRecord);
            			});
          			});
        		}
      		});
    	});
}

module.exports = function(passport) {

    initializeSerialization(passport);
	passport.use('local-signup', new LocalStrategy({
	        usernameField: 'username',        
	        passwordField: 'password',        
	        passReqToCallback: true    
	}, processSignupCallback));  
	passport.use('local-login', new LocalStrategy({        
		usernameField : 'username',        
		passwordField : 'password'  
	}, processLoginCallback));
};