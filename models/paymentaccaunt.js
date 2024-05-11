'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentAccaunt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PaymentAccaunt.belongsTo(models.User,{foreignKey:'UserId'})
    }
  }
  PaymentAccaunt.init({
    UserId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PaymentAccaunt',
  });
  return PaymentAccaunt;
};