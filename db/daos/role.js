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

async function changeRoleCapabilities(roleId, capabilities) {
    try {
        const role = await models.role.findByPk(roleId);
        const caps = await models.capability.findAll({
            where: {
                name: {
                    [Sequelize.Op.in]: capabilities
                }
            }
        });
        await role.setCapabilities(caps);

        const result = {
            roleId: roleId,
            capabilities: caps
        };

        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
}

async function createRole(roleName) {
    return await models.role.create({
        name: roleName
    });
}

module.exports = {
    getAllRoles,
    getAllCapabilities,
    changeRoleCapabilities,
    createRole
};
