const { Router } = require("express");
const route = Router();

// Middlewares
const { postExists } = require("../middlewares/postMiddlewares");

// Controladores
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/post.controller");

route.get("/", getPosts);
route.get("/:id", postExists, getPostById);
route.post("/", createPost);
route.put("/:id", postExists, updatePost);
route.delete("/:id", postExists, deletePost);

module.exports = route;
