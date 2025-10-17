const genericSchemaValidator = (schema, data) => {
  const { error, value } = schema.validate(data, { abotEarly: false });
  return { error, value };
};

module.exports = genericSchemaValidator;
