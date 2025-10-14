const { Router } = require("express");
const route = Router();

// Middlewares
const { postExists } = require("../middlewares/postMiddlewares");
const { imageExists } = require("../middlewares/post_imageMiddlewares");

// Controladores
const {
    addImageToPost,
    deleteImageFromPost,
    getImagesFromPost
} = require("../controllers/post_image.controller");

route.get("/:postId/images", postExists, getImagesFromPost);
route.post("/:postId/images", postExists, addImageToPost);
route.delete("/:postId/images/:imageId", postExists, imageExists, deleteImageFromPost);

module.exports = route;