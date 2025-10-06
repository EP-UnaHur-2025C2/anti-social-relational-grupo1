const { user } = require("../db/models");

// Todos los usuarios:
const getUsers = async (_, res) => {
    try {
        const users = await user.findAll({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
};

// Nuevo usuario:
const createUser = async (req, res) => {
    try {
        const newUser = await user.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el usuario" });
    }
};

// Usuario por ID:
const getUserById = async (req, res) => {
    try {
        // Encontrar usuarios:
        const { id } = req.params;
        const foundUser = await user.findByPk(id);

        // Lo que pasa si no existe:
        if (!foundUser) return res.status(404).json({ error: "Usuario no encontrado" });
        res.status(200).json(foundUser);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el usuario" });
    }
};

// Actualizar usuario por ID:
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await user.update(req.body, { where: { id } });
        if (!updated) return res.status(404).json({ error: "Usuario no encontrado" });

        const updatedUser = await user.findByPk(id);
        res.status(200).json(updatedUser);
    } catch (error) {
        // En caso de que se cambie un nombre a otro que ya existe:
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({ error: "nickName ya existe" });
        }
        res.status(500).json({ error: "Error al actualizar el usuario" });
    }
};

// Eliminar un usuario por ID:
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await user.destroy({ where: { id } });

        if (!deleted) return res.status(404).json({ error: "Usuario no encontrado" });
        res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el usuario" });
    }
}

module.exports = { getUsers, createUser, getUserById, updateUser, deleteUser };