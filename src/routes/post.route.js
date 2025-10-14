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
  agregarImagenPost,
  eliminarImagenDePost,
} = require("../controllers/post.controller");

route.get("/", getPosts);
route.get("/:id", postExists, getPostById); // Tiene el Middleware.
route.post("/", createPost);
route.put("/:id", postExists, updatePost); // Tiene el Middleware.
route.delete("/:id", postExists, deletePost); // Tiene el Middleware.
route.post("/:id/images", postExists, agregarImagenPost); // Tiene el Middleware.   
route.delete("/:id/images/:imageId", postExists, eliminarImagenDePost); // Tiene el Middleware.

module.exports = route;
