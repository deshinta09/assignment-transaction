'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PaymentHistory.belongsTo(models.User,{foreignKey:'SenderId'})
      PaymentHistory.belongsTo(models.User,{foreignKey:'toAddress'})
    }
  }
  PaymentHistory.init({
    name: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    SenderId: DataTypes.INTEGER,
    toAddress: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PaymentHistory',
  });
  return PaymentHistory;
};