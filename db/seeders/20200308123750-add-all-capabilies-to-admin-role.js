'use strict';

const config = require('../../middlewares/roles.config');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const capabilitiesForAdmin = Object.keys(config).map((capability, index) => {
      return {
        role_id: 1,
        capability_id: index+1
      }
    });

    return queryInterface.bulkInsert('capability_role', capabilitiesForAdmin);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('capability_role', null, {});
  }
};