'use strict';
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  var like = sequelize.define('likes', {
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
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        likes.belongsTo(models.users);
        likes.belongsTo(models.posts);
      }
    }
  });
  return like;
};


// to ensure the table is created
// Likes
//   .sync()
//   .then(function(){

//   });
