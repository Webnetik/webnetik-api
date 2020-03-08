'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('capability_role', [
      {
        capability_id: 1,
        role_id: 1
      },
      {
        capability_id: 2,
        role_id: 1
      },
      {
        capability_id: 1,
        role_id: 2
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('capability_role', null, {});
  }
};