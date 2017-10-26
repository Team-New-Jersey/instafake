'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      username: 'test1',
      password: 'test1',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'test2',
      password: 'test2',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'test3',
      password: 'test4',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
