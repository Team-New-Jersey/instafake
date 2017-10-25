'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('users', {
    user_id: DataTypes.INTEGER,
    username: DataTypes.TEXT,
    password: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user;
};

// to ensure the table is created
// users
//   .sync()
//   .then(function(){


//   });
