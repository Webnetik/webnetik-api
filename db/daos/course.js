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

async function modifyCourse(course) {
    const c = await models.course.findOne({
        where: {
            id: course.id
        }
    });
    c.title = course.title;
    c.description = course.description;

    return await c.save();
}

module.exports = {
    getAll,
    create,
    deleteCourse,
    modifyCourse
};
