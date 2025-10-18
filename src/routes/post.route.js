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
  getTagsInPost
} = require("../controllers/post.controller");

route.get("/", getPosts);
route.get("/:id", postExists, getPostById);
route.post("/", validarSchemaPost, createPost);
route.put("/:id", postExists, updatePost);
route.delete("/:id", postExists, deletePost);

// Tags get y post
route.get("/:id/tags", postExists, getTagsInPost) 
route.post("/:id/tags", postExists, addTags);

module.exports = route;
