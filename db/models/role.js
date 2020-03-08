'use strict';
module.exports = (sequelize, DataTypes) => {
    const role = sequelize.define('role', {
        name: DataTypes.STRING
    }, {});

    role.associate = function (models) {
        role.belongsToMany(models.user, { through: 'user_role' });
        role.belongsToMany(models.capability, { through: 'capability_role' });
    };

    return role;
};