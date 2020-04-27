const Sequelize = require('sequelize');
const models = require('../models');

async function getAllUsers() {
    return models.user.findAll({
        include: [
            {
                model: models.role,
                attributes: ['name']
            }
        ],
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

    await models.user_role.create({
        user_id: user.get().id,
        role_id: defaultRole.get().id
    });

    return user;
}

async function getUserById(userId) {
    return models.user.findOne({
        where: {
            id: userId
        }
    });
}

async function getUserProfileById(userId) {
    return models.user.findOne({
        where: {
            id: userId
        },
        include: [
            {
                model: models.role,
                attributes: ['name'],
                through: {
                    attributes: []
                },
                include: [
                    {
                        model: models.capability,
                        attributes: ['id', 'name'],
                        through: {
                            attributes: []
                        }
                    }
                ],
            }
        ],
        order: [
            ['id', 'DESC']
        ]
    });
}

module.exports = {
    getAllUsers,
    getUserByNameAndPassword,
    createUser,
    getUserById,
    getUserProfileById
};
