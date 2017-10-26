'use strict';
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('users', {
    username: DataTypes.TEXT,
    password: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        users.hasMany(models.posts);
        users.hasMany(models.comments);
        users.hasMany(models.likes);
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
