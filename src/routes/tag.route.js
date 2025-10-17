const { Router } = require("express");
const route = Router();

// Middleware
const { existTag, validarSchemaTag } = require("../middlewares/tagMiddlewares");

// Controladores
const {
  getTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
} = require("../controllers/tag.controller");

route.get("/", getTags);
route.get("/:id", getTagById);
route.post("/", validarSchemaTag, existTag, createTag); // Tiene el Middleware.
route.put("/:id", updateTag);
route.delete("/:id", deleteTag);

module.exports = route;
