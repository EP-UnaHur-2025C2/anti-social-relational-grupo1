const { Tag } = require("../db/models");
const genericSchemaValidator = require("../schemas/genericSchemaValidator");
const tagSchema = require("../schemas/tag.schema");
const validarById = require("./generic.middleware");

const validarTagId = validarById(Tag);

const existTag = async (req, res, next) => {
  try {
    const { nombre } = req.body;
    if (!nombre)
      return res.status(400).json({ error: "Se requiere un nombre de tag" });
    const found = await Tag.findOne({ where: { nombre } });
    if (found)
      return res.status(409).json({ error: "Ya existe un tag con ese nombre" });

    next();
  } catch (error) {
    res.status(500).json({ error: "Error al validar tag" });
  }
};

const validarSchemaTag = (req, res, next) => {
  const { error, _ } = genericSchemaValidator(tagSchema, req.body);
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
module.exports = { existTag, validarSchemaTag, validarTagId };
