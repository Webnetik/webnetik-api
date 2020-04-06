'use strict';

const config = require('../../middlewares/roles.config');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const capabilities = Object.keys(config).map(capability => {
      return {
        name: capability
      }
    });

    return queryInterface.bulkInsert('capability',
        capabilities
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('capability', null, {});
  }
};
