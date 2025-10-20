const { Router } = require("express");
const route = Router();

// Middlewares
const {
  postExists,
  validarSchemaPost,
  validarSchemaPostTagImage,
} = require("../middlewares/postMiddlewares");
const { validarSchemaComment } = require("../middlewares/commentMiddlewares");
const simpleUserAuth = require("../middlewares/simpleUserAuth");
const {
  validarSchemaImage,
  imageExists,
} = require("../middlewares/post_ImageMiddlewares");

// Controladores
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  addTag,
  getTagsInPost,
  getImagesFromPost,
  addImageToPost,
  deleteImageFromPost,
} = require("../controllers/post.controller");

const { createComment } = require("../controllers/comment.controller");

route.get("/", getPosts);
route.get("/:id", postExists, getPostById);
route.post("/", simpleUserAuth, validarSchemaPostTagImage, createPost);
route.post(
  // INSERTAR COMENTARIO A UN POST
  "/:id/comments",
  postExists,
  simpleUserAuth,
  validarSchemaComment,
  createComment
);
route.put("/:id", postExists, updatePost);
route.delete("/:id", postExists, deletePost);

// Tags get y post
route.get("/:id/tags", postExists, getTagsInPost);
route.post("/:id/tags", postExists, addTag);

// Images get, post y delete
route.get("/:id/images", postExists, getImagesFromPost);
route.post("/:id/images", postExists, validarSchemaImage, addImageToPost);
route.delete("/:id/images/:imageId", postExists, deleteImageFromPost);

module.exports = route;
