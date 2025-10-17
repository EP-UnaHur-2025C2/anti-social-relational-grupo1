const { Comment } = require("../db/models");
const genericSchemaValidator = require("../schemas/genericSchemaValidator");
const commentSchema = require("../schemas/comment.schema");

// Verifica si existe el comentario
const commentExists = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }
    req.comment = comment;
    next();
  } catch (error) {
    res.status(500).json({ error: "Error al verificar el comentario" });
  }
};

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
