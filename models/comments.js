'use strict';
module.exports = (sequelize, DataTypes) => {
  var comments = sequelize.define('comments', {
    username: DataTypes.TEXT,
    post_id: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here

      }
    }
  });
  return comments;
};
