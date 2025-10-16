const { Router } = require("express");
const route = Router();

// Middlewares
const { commentExists } = require("../middlewares/commentMiddlewares");

// Controladores
const {
    getComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment,
} = require("../controllers/comment.controller");

route.get("/", getComments);
route.get("/:id", commentExists, getCommentById);
route.post("/post/:postId", createComment);
route.put("/:id", commentExists, updateComment);
route.delete("/:id", commentExists, deleteComment);


module.exports = route;