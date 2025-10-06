'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasMany(models.post, {foreignKey: 'userId'});
      user.hasMany(models.comment, {foreignKey: 'userId'})
    }
  }
  user.init({
    nickname: {type: DataTypes.STRING, unique: true, allowNull: false},
    mail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};