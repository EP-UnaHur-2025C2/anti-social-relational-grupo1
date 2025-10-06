'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post_images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      post_images.belongsTo(models.post, {foreignKey: 'postId'})
    }
  }
  post_images.init({
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'post_images',
  });
  return post_images;
};