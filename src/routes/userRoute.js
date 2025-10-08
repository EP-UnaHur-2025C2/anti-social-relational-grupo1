const { Router } = require("express");
const route = Router();

// Middlewares:
const { existUserName } = require("../middlewares/userMiddlewares");

// Controladores:
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require("../controllers/userController");

route.get("/", getUsers);
route.get("/:id", getUserById);
route.post("/", existUserName, createUser); // Tiene el Middleware.
route.put("/:id", updateUser);
route.delete("/:id", deleteUser);

module.exports = route;