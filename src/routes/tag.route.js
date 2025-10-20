const { Router } = require("express");
const route = Router();

// Middleware
const {
  existTag,
  validarSchemaTag,
  validarTagId,
} = require("../middlewares/tagMiddlewares");

// Controladores
const {
  getTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
} = require("../controllers/tag.controller");

route.get("/", getTags);
route.get("/:id", validarTagId, getTagById);
route.post("/", validarSchemaTag, existTag, createTag); // Tiene el Middleware.
route.put("/:id", validarTagId, existTag, updateTag);
route.delete("/:id", validarTagId, deleteTag);

module.exports = route;
