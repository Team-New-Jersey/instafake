var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var connection = require('./sql.js');
const env = require('dotenv').load();
connection.sync();

var app = express();
app.use(passport.initialize());

require('./strategies/passport-local')(passport);
require('./strategies/passport-jwt')(passport);
// function logResponseBody(req, res, next) {
//   var oldWrite = res.write,
//       oldEnd = res.end;

//   var chunks = [];

//   res.write = function (chunk) {
//     chunks.push(new Buffer(chunk));

//     oldWrite.apply(res, arguments);
//   };

//   res.end = function (chunk) {
//     if (chunk)
//       chunks.push(new Buffer(chunk));

//     var body = Buffer.concat(chunks).toString('utf8');
//     console.log(req.path, body);

//     oldEnd.apply(res, arguments);
//   };

//   next();
// }

// app.use(logResponseBody);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/public')));

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
    } else  {
      next(jwtError)
    }
  })(req, res, next)
});

app.use('/api/protected/', homeRoutes);
app.use('/api/protected/profile', profileRoutes);
app.use('/api/protected', logoutRoutes);

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});

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

connection.sync().then(function() {
  console.log("Database ready");
  app.listen(process.env.PORT || 4000, function() {
    console.log("Listening at 4000");
  });
});

module.exports = app;
