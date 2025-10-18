const { Post } = require("../db/models");
const genericSchemaValidator = require("../schemas/genericSchemaValidator");
const postSchema = require("../schemas/post.schema");
const postTagImageSchema = require("../schemas/post-tag-images.Schema");
const validarById = require("./generic.middleware");

// Verifica que el post exista por ID
const postExists = validarById(Post);

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

const validarSchemaPostTagImage = (req, res, next) => {
  const { error, _ } = genericSchemaValidator(postTagImageSchema, req.body);
  if (error) {
    return res.status(400).json({
      errores: error.details.map((e) => {
        return {
          attributo: e.path.join("."),
          detalle: e.message,
        };
      }),
    });
  }
  next();
};

module.exports = { postExists, validarSchemaPost, validarSchemaPostTagImage };
