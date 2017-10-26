'use strict';
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('users', {
    username: DataTypes.TEXT,
    password: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        user.hasMany(models.post);
        user.hasMany(models.comment);
        user.hasMany(models.like);
      }
    }
  });
  return user;
};

// to ensure the table is created
// user
//   .sync()
//   .then(function(){


//   });
