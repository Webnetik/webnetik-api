
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('capability_role', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      capability_id: {
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        references: {
          model: 'capability',
          key: 'id'
        }
      },
      role_id: {
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        references: {
          model: 'role',
          key: 'id'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('capability_role');
  }
};