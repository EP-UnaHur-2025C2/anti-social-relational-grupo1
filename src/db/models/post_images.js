'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post_images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post_images.belongsTo(models.Post, {foreignKey: 'postId'})
    }
  }
  Post_images.init({
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post_images',
  });
  return Post_images;
};