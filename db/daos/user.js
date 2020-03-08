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

async function createUser(username, password) {
    const user = await models.user.create({
        username: username,
        password: password
    });
    const defaultRole = await models.role.findOne({
        where: {
            name: "user"
        }
    });
    //user.setRole(defaultRole);
    return user;
}

async function getUserById(userId) {
    return models.user.findOne({
        where: {
            id: userId
        }
    });
}

module.exports = {
    getAllUsers,
    getUserByNameAndPassword,
    createUser,
    getUserById
};
