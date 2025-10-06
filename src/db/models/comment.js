'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      comment.belongsTo(models.post, {foreignKey: 'postId'})
      comment.belongsTo(models.user, {userId})
    }
  }
  comment.init({
    texto: DataTypes.STRING,
    visible: DataTypes.BOOLEAN
    /*
    !!!! TERMINAR DE COMPLETAR ESTO CUANDO SEA NECESARIO Y SE PUEDA. !!!!!
    {
      type: new DataTypes.VIRTUAL(DataTypes.BOOLEAN, [])
    }
    */
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};