'use strict';
module.exports = (sequelize, DataTypes) => {
  var Posts = sequelize.define('Posts', {
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
  return Posts;
};

// to ensure the table is created
Posts
  .sync()
  .then(function(){

  });
