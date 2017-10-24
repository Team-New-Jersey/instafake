'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comments = sequelize.define('comments', {
    username: DataTypes.TEXT,
    image_id: DataTypes.INTEGER,
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
  return Comments;
};

// to ensure the table is created
Comments
  .sync()
  .then(function(){
});
