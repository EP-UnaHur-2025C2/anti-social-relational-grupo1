const Joi = require("joi");

const userSchema = Joi.object({
  nickname: Joi.string().required().messages({
    "string.empty": "El nickname no puede estar vacio",
    "any.required": "El atributo nickname tiene que existir",
  }),
  mail: Joi.string().required().messages({
    "string.empty": "El mail no puede estar vacio",
    "any.required": "El atributo mail tiene que existir",
  }),
});

module.exports = userSchema;
