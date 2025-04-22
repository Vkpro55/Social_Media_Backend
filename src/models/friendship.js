'use strict';
const { Model } = require('sequelize');
const { REQUEST_RESPONSE_STATUS } = require('../utils/common/enums');
const { PENDING, ACCEPTED, REJECTED } = REQUEST_RESPONSE_STATUS;

module.exports = (sequelize, DataTypes) => {
  class Friendship extends Model {
    static associate(models) {
      Friendship.belongsTo(models.User, {
        foreignKey: 'senderId',
        as: 'Sender'
      });

      Friendship.belongsTo(models.User, {
        foreignKey: 'receiverId',
        as: 'Receiver'
      });
    }
  }

  Friendship.init({
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM(PENDING, ACCEPTED, REJECTED),
      defaultValue: PENDING
    }
  }, {
    sequelize,
    modelName: 'Friendship',
  });

  return Friendship;
};
