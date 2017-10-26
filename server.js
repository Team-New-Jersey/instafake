// babel require hook
require('babel-register');

var app = require('./server.babel');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://Nemiliox@localhost:5432/instabase');

module.exports = app;
