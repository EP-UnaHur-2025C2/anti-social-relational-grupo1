const { Post } = require("../db/models");
const genericSchemaValidator = require("../schemas/genericSchemaValidator");
const postSchema = require("../schemas/post.schema");

// Verifica que el post exista por ID
const postExists = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);

    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    req.post = post;
    next();
  } catch (error) {
    res.status(500).json({ error: "Error al verificar el post" });
  }
};

const validarSchemaPost = (req, res, next) => {
  const { error, _ } = genericSchemaValidator(postSchema, req.body);
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

module.exports = { postExists, validarSchemaPost };
