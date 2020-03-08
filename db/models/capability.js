'use strict';
module.exports = (sequelize, DataTypes) => {
    const capability = sequelize.define('capability', {
        name: DataTypes.STRING
    }, {});

    capability.associate = function (models) {
        capability.belongsToMany(models.role, { through: 'capability_role' });
    };

    return capability;
};