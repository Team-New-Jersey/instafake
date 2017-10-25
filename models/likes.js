'use strict';
module.exports = (sequelize, DataTypes) => {
  var likes = sequelize.define('likes', {
    username: DataTypes.TEXT,
    post_id: DataTypes.INTEGER,
    thumbs_up: DataTypes.BOOLEAN,
    created_at: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Likes;
};


// to ensure the table is created
// Likes
//   .sync()
//   .then(function(){

//   });
