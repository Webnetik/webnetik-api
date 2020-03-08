const Sequelize = require('sequelize');
const models = require('../models');

async function getAllUsers() {
    return models.user.findAll({
        order: [
            ['id', 'DESC']
        ]
    });
}

async function getUserByNameAndPassword(username, password) {
    return models.user.findOne({
        where: {
            username: username,
            password: password
        }
    });
}

module.exports = {
    getAllUsers,
    getUserByNameAndPassword
};
