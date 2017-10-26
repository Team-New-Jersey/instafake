// babel require hook
require('babel-register');

var app = require('./server.babel');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://postgres@localhost:1234/instabase');

module.exports = app;
