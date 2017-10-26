'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('comments', [{
      user_id: 3,
      post_id: 1,
      comment: 'cool pic',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      user_id: 1,
      post_id: 3,
      comment: 'nice pic',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      user_id: 2,
      post_id: 2,
      comment: 'great pic',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('comments', null, {});
  }
};

