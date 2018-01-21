// babel require hook
require('babel-register');

var app = require('./server.babel');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://nbzqgbjjhvtkmj:91ba656ed565b1cf6b5787ba7887833912e08e76cf48cfe69715a7292c43d349@ec2-107-22-183-40.compute-1.amazonaws.com:5432/da9k3p78krq5vv');

module.exports = app;
