const { Router } = require("express");
const route = Router();

// Middlewares
const { postExists } = require("../middlewares/postMiddlewares");
const {
  imageExists,
  validarSchemaImage,
} = require("../middlewares/post_ImageMiddlewares");

// Controladores
const {
  getImages,
  addImageToPost,
  deleteImageFromPost,
  getImagesFromPost,
} = require("../controllers/post_image.controller");

route.get("/", getImages);

module.exports = route;
