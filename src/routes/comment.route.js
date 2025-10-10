const { Router } = require("express");
const route = Router();

// Middlewares

// Controladores
const {
    getComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment,
} = require("../controllers/comment.controller");

route.get("/", getComments);
route.get("/:id", getCommentById);
route.post("/", createComment);
route.put("/:id", updateComment);
route.delete("/:id", deleteComment);

module.exports = route;