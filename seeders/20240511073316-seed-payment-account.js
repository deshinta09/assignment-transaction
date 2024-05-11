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
   await queryInterface.bulkInsert('PaymentAccounts', [
    {
      UserId: 1,
      amount: 200,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      UserId: 1,
      amount: 500,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      UserId: 2,
      amount: 100,
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
