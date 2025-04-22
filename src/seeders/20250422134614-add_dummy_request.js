'use strict';

const { REQUEST_RESPONSE_STATUS } = require('../utils/common/enums');
const { PENDING } = REQUEST_RESPONSE_STATUS;

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('Friendships', [
      {
        senderId: 23,
        receiverId: 41,
        status: PENDING,
        createdAt: now,
        updatedAt: now
      },
      {
        senderId: 25,
        receiverId: 41,
        status: PENDING,
        createdAt: now,
        updatedAt: now
      },
      {
        senderId: 29,
        receiverId: 41,
        status: PENDING,
        createdAt: now,
        updatedAt: now
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Friendships', {
      receiverId: 1,
      senderId: [3, 5, 9]
    });
  }
};
