'use strict';
module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define('users', {
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
<<<<<<< HEAD
  .then(function() {
});
=======
  .then(

  });
>>>>>>> troubleshooting sequelize/postgres issues
