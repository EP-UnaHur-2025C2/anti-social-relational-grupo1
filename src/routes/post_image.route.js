const { Router } = require("express");

const route = Router();

//controladores

const {
  getPost_images,
  getPost_imageById,
  createPost_image,
  updatePost_image,
  deletePost_image,
} = require("../controllers/post_image.controller");

route.get("/", getPost_images);
route.get("/:id", getPost_imageById);
route.post("/", createPost_image);
route.put("/:id", updatePost_image);
route.delete("/:id", deletePost_image);

module.exports = route;
