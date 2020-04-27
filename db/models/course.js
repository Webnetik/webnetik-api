'use strict';
module.exports = (sequelize, DataTypes) => {
    const course = sequelize.define('course', {
        title: DataTypes.STRING,
        description: DataTypes.STRING
    }, {});

    course.associate = function (models) {
    };

    return course;
};
