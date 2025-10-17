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
  addImageToPost,
  deleteImageFromPost,
  getImagesFromPost,
} = require("../controllers/post_image.controller");

route.get("/:postId/images", postExists, getImagesFromPost);
route.post("/:postId/images", postExists, validarSchemaImage, addImageToPost);
route.delete(
  "/:postId/images/:imageId",
  postExists,
  imageExists,
  deleteImageFromPost
);

module.exports = route;
