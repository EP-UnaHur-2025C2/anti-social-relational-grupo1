const { Post_images } = require("../db/models");
const genericSchemaValidator = require("../schemas/genericSchemaValidator");
const imageSchema = require("../schemas/postImage.schema");

const imageExists = async (req, res, next) => {
  const { imageId } = req.params;
  const image = await Post_images.findByPk(imageId);
  if (!image) {
    return res.status(404).json({ message: "La imagen no existe" });
  }
  next();
};

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
