'use strict';

const { hashedPassword } = require('../helpers/bcrypt');

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
   await queryInterface.bulkInsert('Users', [
    {
      email: 'user1@mail.com',
      password: hashedPassword('secret1'),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'user2@mail.com',
      password: hashedPassword('secret2'),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'user3@mail.com',
      password: hashedPassword('secret3'),
      createdAt: new Date(),
      updatedAt: new Date()
    }
   ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {})
  }
};
