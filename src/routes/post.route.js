const { Router } = require("express")

const route = Router();

//controladores

const { getPosts, getPostById, createPost, updatePost, deletePost } = require("../controllers/post.controller")

route.get("/", getPosts);
route.get("/:id", getPostById);
route.post("/", createPost);
route.put("/:id", updatePost);
route.delete("/:id", deletePost);

module.exports = route;