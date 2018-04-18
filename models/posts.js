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
    img_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
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
