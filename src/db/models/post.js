'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      post.belongsTo(models.user, {foreignKey: 'userId'});
      post.hasMany(models.post_images, {foreignKey: 'postId'})
      post.hasMany(models.comment, {foreignKey: 'postId'})
      post.belongsToMany(models.tag, {through: 'PostTags'})
    }
  }
  post.init({
    texto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};