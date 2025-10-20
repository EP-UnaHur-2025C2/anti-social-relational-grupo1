"use strict";
const { Model, INTEGER } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.Post, { foreignKey: "postId" });
      Comment.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Comment.init(
    {
      texto: { type: DataTypes.STRING, allowNull: false },
      visible: {
        // ⬅️ Convertido a objeto para incluir la opción
        type: DataTypes.BOOLEAN,
        defaultValue: true, // ⬅️ El valor por defecto al crear el comentario
      },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
