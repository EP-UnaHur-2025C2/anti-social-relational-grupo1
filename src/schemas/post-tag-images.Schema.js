const Joi = require("joi");
const postSchema = require("./post.schema");
const tagSchema = require("./tag.schema");
const imageSchema = require("./postImage.schema");

const postTagImageSchema = postSchema.keys({
  tags: Joi.array().items(tagSchema).messages(),
  postimages: Joi.array().items(imageSchema).messages(),
});

module.exports = postTagImageSchema;
