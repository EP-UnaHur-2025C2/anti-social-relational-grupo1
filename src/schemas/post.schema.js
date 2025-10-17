const Joi = require("joi");

const postSchema = Joi.object({
    texto: Joi.string().max(140).required().messages({
        "string.empty": "Ingrese una descripción en su post",
        "string.max": "La descripción debe tener como maximo {#limit}"
    })
})

module.exports = postSchema;