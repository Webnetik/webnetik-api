'use strict';
module.exports = (sequelize, DataTypes) => {
    const user_role = sequelize.define('user_role', {
        user_id: {
            type: DataTypes.INTEGER,
            reference: 'user',
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

    user_role.associate = function(models) {
    };

    return user_role;
};