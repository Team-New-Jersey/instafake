var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var Promise = require('bluebird');

// REQUIRE ROUTES, see node-file-upload-starter/app.js

var app = express();
app.use(passport.initialize());
app.use(passport.session());

require('./strategies/passport-local')(passport); // NOT IN SLIDES, SO NECESSARY WTF!
var loginRoutes = require('./routes/login')(passport);
var signupRoutes = require('./routes/login')(passport);
var homeRoutes =  require('./routes/home')(passport);
// var profileRoutes =  require('./routes/profile')(passport);


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// mount routers

app.use('/', loginRoutes);
app.use('/signup', signupRoutes);
app.use('/home', homeRoutes);
// app.use('/profile', profileRoutes);


app.use('/*', function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.error('DEV ERROR')
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
    console.error('PROD ERROR')
    res.json({
      message: err.message,
      error: {}
    });
  });
}


module.exports = app;

app.listen(4000, function() {
  console.log('App is listening on port 4000!');
});
