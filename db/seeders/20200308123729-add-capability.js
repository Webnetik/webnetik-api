'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('capability', [
      {
        name: "register_user"
      },
      {
        name: "delete_user"
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('capability', null, {});
  }
};
