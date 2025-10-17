const Joi = require("joi");

const commentSchema = Joi.object({
  texto: Joi.string().max(140).required().messages({
    "string.empty": "El texto no puede estar vacio",
    "string.max": "El texto debe tener como maximo 140 caracteres",
    "any.required": "El atributo texto tiene que existir",
  }),
});

module.exports = commentSchema;
