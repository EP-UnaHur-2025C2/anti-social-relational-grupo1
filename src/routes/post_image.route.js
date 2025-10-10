const { Router } = require("express");
const route = Router();

// Middlewares
const { validateImageBody, checkImageExists } = require("../middlewares/post_imageMiddlewares");

// Controladores
const {
  getPost_images,
  getPost_imageById,
  createPost_image,
  updatePost_image,
  deletePost_image,
} = require("../controllers/post_image.controller");

route.get("/", getPost_images);
route.get("/:id", checkImageExists, getPost_imageById);
route.post("/", validateImageBody, createPost_image);
route.put("/:id", checkImageExists, updatePost_image);
route.delete("/:id", checkImageExists, deletePost_image);

module.exports = route;
