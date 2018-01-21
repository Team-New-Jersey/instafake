// babel require hook
require('babel-register');

var app = require('./server.babel');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://pvswpjtuimldnh:fad3cd7f7b89d6098d063a417646cea42b727afd3fb1d48953c65ed88b58afee@ec2-54-235-73-241.compute-1.amazonaws.com:5432/d9ev6uhm5gsgaj');

module.exports = app;
