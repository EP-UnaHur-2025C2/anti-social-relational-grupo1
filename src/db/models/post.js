'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, {foreignKey: 'userId'});
      Post.hasMany(models.Post_images, {foreignKey: 'postId'})
      Post.hasMany(models.Comment, {foreignKey: 'postId'})
      Post.belongsToMany(models.Tag, {through: 'PostTags', as: 'tags'})
    }
  }
  Post.init({
    texto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};