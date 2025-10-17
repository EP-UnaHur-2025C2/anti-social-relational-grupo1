const Joi = require("joi");

const postImageSchema = Joi.object({
  url: Joi.string().uri().required().messages({
    "string.empty": "Ingrese la URL de la imagen",
    "string.uri": "La URL de la imagen debe ser válida",
  }),
});

module.exports = postImageSchema;
