'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post, {foreignKey: 'userId'});
      User.hasMany(models.Comment, {foreignKey: 'userId'})
    }
  }
  User.init({
    nickname: {type: DataTypes.STRING, unique: true, allowNull: false},
    mail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};