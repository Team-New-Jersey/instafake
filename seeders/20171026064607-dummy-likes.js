'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('likes', [{
      user_id: 3,
      post_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      user_id: 1,
      post_id: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      user_id: 2,
      post_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('likes', null, {});
  }
};