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

// Controladores
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  addTags,
  getTagsInPost,
} = require("../controllers/post.controller");

const { createComment } = require("../controllers/comment.controller");

route.get("/", getPosts);
route.get("/:id", postExists, getPostById);
route.post("/", validarSchemaPostTagImage, createPost);
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
route.post("/:id/tags", postExists, addTags);

module.exports = route;
