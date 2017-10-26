'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('posts', [{
      user_id: 3,
      description: 'my pic',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      user_id: 1,
      description: 'a pic',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      user_id: 2,
      description: 'new pic',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('posts', null, {});
  }
};