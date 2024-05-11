'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('PaymentHistories', [
    {
      name: 'Online Store Payment',
      amount: 20,
      SenderId: 1,
      ReceiverId: 3,
      type: 'send',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'withdraw user',
      amount: 10,
      SenderId: 1,
      ReceiverId: 1,
      type: 'withdraw',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'transfer user',
      amount: 50,
      SenderId: 3,
      ReceiverId: 3,
      type: 'send',
      createdAt: new Date(),
      updatedAt: new Date()
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
