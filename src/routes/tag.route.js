const { Router } = require("express");

const route = Router();

//middleware
const { existTag } = require("../middlewares/tagMiddlewares");

//controladores

const {
  getTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
} = require("../controllers/tag.controller");

route.get("/", getTags);
route.get("/:id", getTagById);
route.post("/", existTag, createTag);
route.put("/:id", updateTag);
route.delete("/:id", deleteTag);

module.exports = route;
