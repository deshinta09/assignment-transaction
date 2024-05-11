'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PaymentHistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.INTEGER
      },
      SenderId: {
        type: Sequelize.INTEGER,
        references:{
          key:'id',
          model:'PaymentAccounts'
        }, onDelete:'cascade', onUpdate:'cascade'
      },
      toAddress: {
        type: Sequelize.INTEGER,
        references:{
          key:'id',
          model:'PaymentAccounts'
        }, onDelete:'cascade', onUpdate:'cascade'
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PaymentHistories');
  }
};