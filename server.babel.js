var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
const aws = require('aws-sdk');
require('dotenv').config();

var app = express();
app.use(passport.initialize());

require('./strategies/passport-local')(passport);
require('./strategies/passport-jwt')(passport);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, '/static')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var loginRoutes = require('./routes/login')(passport);
var homeRoutes = require('./routes/home');
var profileRoutes = require('./routes/profile');
var logoutRoutes = require('./routes/logout');

app.use('/api/', loginRoutes);

app.use('/api/protected/', function(req, res, next) {
  passport.authenticate('jwt', {session: false}, function(err, user, jwtError) {
    if (user) {
      req.login(user, null, () => {})
      next()
    } else {
      res.redirect(301, 'http://localhost:4000/api')
      next();
    }
  })(req, res, next)
});

app.use('/api/protected/', homeRoutes);
app.use('/api/protected/profile', profileRoutes);
app.use('/api/logout', logoutRoutes);

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

app.use('/api/*', function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found Okay');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error('PROD ERROR')
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
} else {
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.error('DEV ERROR')
    res.json({
      message: err.message,
      error: {}
    });
  });
}

const port = process.env.PORT || 4000;
app.listen(port);

module.exports = app;
