// babel require hook
require('babel-register');

var app = require('./server.babel');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('process.env.CONN_STRING');

module.exports = app;
