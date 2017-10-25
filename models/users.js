'use strict';
module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define('Users', {
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
  return Users;
};

// to ensure the table is created
Users
  .sync()
  .then(function() {
});
