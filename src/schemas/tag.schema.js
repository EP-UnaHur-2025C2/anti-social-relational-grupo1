const Joi = require("joi");

const tagSchema = Joi.object({
  nombre: Joi.string().required().messages({
    "string.empty": "El nombre no puede estar vacio",
    "any.required": "El atributo nombre tiene que existir",
  }),
});

module.exports = tagSchema;
