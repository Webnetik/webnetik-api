const Sequelize = require('sequelize');
const models = require('../models');

async function getAllRoles() {
    return models.role.findAll({
        order: [
            ['id', 'DESC']
        ]
    });
}

module.exports = {
    getAllRoles
};
