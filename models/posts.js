'use strict';
module.exports = (sequelize, DataTypes) => {
  var posts = sequelize.define('posts', {
    image_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    created_at: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
    }
  });
  return posts;
};

// to ensure the table is created
posts
  .sync()
  .then(function(){

  });
