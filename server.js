// babel require hook
require('babel-register');
require('dotenv').config();

var app = require('./server.babel');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://postgres@localhost:1234/instabase' || process.env.CONN_STRING);

module.exports = app;
