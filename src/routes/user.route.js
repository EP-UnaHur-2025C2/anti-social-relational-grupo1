const { Router } = require("express");
const route = Router();

// Middlewares:
const {
  existUserName,
  validarSchemaUser,
  validarUserById,
} = require("../middlewares/userMiddlewares");

// Controladores:
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

route.get("/", getUsers);
route.get("/:id", validarUserById, getUserById);
route.post("/", validarSchemaUser, existUserName, createUser); // Tiene el Middleware.
route.put("/:id", validarUserById, existUserName, updateUser);
route.delete("/:id", validarUserById, deleteUser);

module.exports = route;
