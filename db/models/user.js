'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});

  user.associate = function (models) {
    user.belongsToMany(models.role, { through: 'user_role' });
  };

  return user;
};