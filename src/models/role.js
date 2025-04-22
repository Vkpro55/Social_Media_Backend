'use strict';
const {
  Model
} = require('sequelize');

const { Enums } = require('../utils/common');
const { ADMIN, CUSTOMER } = Enums.USER_ROLES;
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {

    static associate(models) {

      this.belongsToMany(models.User, {
        through: 'User_Roles',
        as: 'user'
      });
    }
  }
  Role.init({
    name: {
      type: DataTypes.ENUM({
        values: [ADMIN, CUSTOMER]
      }),
      allowNull: false,
      defaultValue: CUSTOMER
    }
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};