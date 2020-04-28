const Sequelize = require('sequelize');
const models = require('../models');

async function getAll() {
    return models.course.findAll({
        order: [
            ['id', 'DESC']
        ]
    });
}

async function create(title, description) {
    return await models.course.create({
        title: title,
        description: description
    });
}

async function deleteCourse(id) {
    const result = await models.course.destroy({
        where: {
            id: id
        }
    });
    return id;
}

module.exports = {
    getAll,
    create,
    deleteCourse
};
