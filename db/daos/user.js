const Sequelize = require('sequelize');
const models = require('../models');

async function getAllUsers() {
    return models.user.findAll({
        order: [
            ['id', 'DESC']
        ]
    });
}

module.exports = {
    getAllUsers
};
