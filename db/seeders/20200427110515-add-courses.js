'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('course', [
      {
        title: 'Basic Javascript for beginners',
        description: 'This is a cool course for everyone who wants to know Javascript'
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('course', null, {});
  }
};
