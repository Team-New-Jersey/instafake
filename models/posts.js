'use strict';
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  var post = sequelize.define('posts', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    description: DataTypes.TEXT,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        post.belongsTo(models.user);
        post.hasMany(models.like);
        post.hasMany(models.comment);
      }
    }
  });
  return post;
};

// to ensure the table is created
// posts
//   .sync()
//   .then(function(){

//   });
