'use strict';
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  var comment = sequelize.define('comments', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'posts',
        key: 'id'
      }
    },
    comment: DataTypes.TEXT,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        comment.belongsTo(models.user);
        comment.belongsTo(models.post);
      }
    }
  });
  return comment;
};

