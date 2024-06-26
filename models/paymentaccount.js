'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PaymentAccount.hasMany(models.PaymentHistory, {foreignKey:'SenderId'})
      PaymentAccount.hasMany(models.PaymentHistory, {foreignKey:'toAddress'})
      PaymentAccount.belongsTo(models.User, {foreignKey:'UserId'})
    }
  }
  PaymentAccount.init({
    UserId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PaymentAccount',
  });
  return PaymentAccount;
};