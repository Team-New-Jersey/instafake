const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../db').users;

const config = require('../config/config');

var cookieExtractor = function(req) {
  var token = null;
  if (req && req.cookies) token = req.cookies['jwt'];
  return token;
};
module.exports = function(passport) {  
  var opts = {};
  opts.jwtFromRequest = cookieExtractor; // check token in cookie
  opts.secretOrKey = config.jwtSecret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findById(jwt_payload.id)
        .then(function(user) {
            if (user) {
                done(null, user);
            } else {
                done(null, false, 'No user was found for the token provided');
            }
        });
    }));
};