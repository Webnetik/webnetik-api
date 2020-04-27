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
    });;
}

module.exports = {
    getAll,
    create
};
