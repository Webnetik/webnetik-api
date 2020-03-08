'use strict';
module.exports = (sequelize, DataTypes) => {
    const capability_role = sequelize.define('capability_role', {
        capability_id: {
            type: DataTypes.INTEGER,
            reference: 'capability',
            referenceKey: 'id',
            allowNull: false
        },
        role_id: {
            type: DataTypes.INTEGER,
            reference: 'role',
            referenceKey: 'id',
            allowNull: false
        }
    }, {});

    capability_role.associate = function(models) {
    };

    return capability_role;
};