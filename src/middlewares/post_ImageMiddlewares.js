const { Post_images } = require("../db/models");
const genericSchemaValidator = require("../schemas/genericSchemaValidator");
const imageSchema = require("../schemas/postImage.schema");
const validarById = require("./generic.middleware");

const imageExists = validarById(Post_images);

const validarSchemaImage = (req, res, next) => {
  const { error, _ } = genericSchemaValidator(imageSchema, req.body);
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

module.exports = { imageExists, validarSchemaImage };
