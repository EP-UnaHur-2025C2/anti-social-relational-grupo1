const { Comment } = require("../db/models");
const genericSchemaValidator = require("../schemas/genericSchemaValidator");
const commentSchema = require("../schemas/comment.schema");
const validarById = require("./generic.middleware");

// Verifica si existe el comentario
const commentExists = validarById(Comment);

const validarSchemaComment = (req, res, next) => {
  const { error, _ } = genericSchemaValidator(commentSchema, req.body);
  if (error) {
    res.status(400).json({
      errores: error.details.map((e) => {
        return {
          attributo: e.path[0],
          detalle: e.message,
        };
      }),
    });
  }
  next();
};

module.exports = { commentExists, validarSchemaComment };
