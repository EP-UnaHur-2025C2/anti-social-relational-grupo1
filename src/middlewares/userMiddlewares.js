const { User } = require("../db/models");
const genericSchemaValidator = require("../schemas/genericSchemaValidator");
const userSchema = require("../schemas/user.schema");
const validarById = require("../middlewares/generic.middleware");

const validarUserById = validarById(User);

const existUserName = async (req, res, next) => {
  try {
    const { nickname } = req.body;

    const found = await User.findOne({ where: { nickname } });
    if (found) return res.status(409).json({ error: "nickName ya existe" });

    next();
  } catch (error) {
    res.status(500).json({ error: "Error al validar nickName" });
  }
};

const validarSchemaUser = (req, res, next) => {
  const { error, _ } = genericSchemaValidator(userSchema, req.body);
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

module.exports = { existUserName, validarSchemaUser, validarUserById };
