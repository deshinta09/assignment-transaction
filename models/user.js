'use strict';
const {
  Model
} = require('sequelize');
const { hashedPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.PaymentHistory,{foreignKey:'SenderId'})
      User.hasMany(models.PaymentHistory,{foreignKey:'toAddress'})
      User.hasMany(models.PaymentAccount,{foreignKey:'UserId'})
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate( (user) => {
    user.password = hashedPassword(user.password);
  });
  return User;
};