const { Router } = require("express");
const route = Router();

// Middlewares
const {
  postExists,
  validarSchemaPost,
} = require("../middlewares/postMiddlewares");

// Controladores
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  addTags,
} = require("../controllers/post.controller");

route.get("/", getPosts);
route.get("/:id", postExists, getPostById);
route.post("/", validarSchemaPost, createPost);
route.put("/:id", postExists, updatePost);
route.delete("/:id", postExists, deletePost);

// Tags get y post (NO ESTAN EN SWAGGER, getTagsInPost no es seguro)
// route.get("/:postId/tags", getTagsInPost) // obtiene tags relacionados a ese post
route.post("/:postId/tags", addTags);

module.exports = route;
