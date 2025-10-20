const { User } = require("../db/models");

// Devolver Todos los usuarios:
const getUsers = async (_, res) => {
  try {
    const users = await User.findAll({});
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener los usuarios", detalle: error.message });
  }
};

// Nuevo usuario:
const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};

// Usuario por ID:
const getUserById = async (req, res) => {
  try {
    // Encontrar usuario:
    const { id } = req.params;
    const usuario = await User.findByPk(id);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

// Actualizar usuario por ID:
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    user.update({ nickname: req.body.nickname });
    res.status(200).json(user);
  } catch (error) {
    // En caso de que se cambie un nombre a otro que ya existe:
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ error: "nickname ya existe" });
    }
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};

// Eliminar un usuario por ID:
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({ where: { id } });
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};

module.exports = { getUsers, createUser, getUserById, updateUser, deleteUser };
