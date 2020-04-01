const Sequelize = require('sequelize');
const models = require('../models');

async function getAllRoles() {
    return models.role.findAll({
        include: [
            {
                model: models.capability,
                attributes: ['id', 'name'],
                through: {
                    attributes: []
                }
            }
        ],
        order: [
            ['id', 'DESC']
        ]
    });
}

async function getAllCapabilities() {
    return models.capability.findAll({
        order: [
            ['id', 'DESC']
        ]
    });
}

module.exports = {
    getAllRoles,
    getAllCapabilities
};
