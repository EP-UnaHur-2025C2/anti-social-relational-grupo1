const { Tag } = require("../db/models");

// Devolver todos los Tags
const getTags = async (_, res) => {
  try {
    const data = await Tag.findAll({});
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener los Tags", detalle: error.message });
  }
};

// Tag por id
const getTagById = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findByPk(id);

    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el Tag" });
  }
};

// Crear Tag
const createTag = async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el Tag" });
  }
};

// Actualizar Tag con id
const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Tag.update(req.body, { where: { id } });
    if (updated[0] === 0)
      return res.status(404).json({ error: "Tag no encontrado" }); //SACAR CON MIDDLEWARE

    const updatedTag = await Tag.findByPk(id);
    res.status(200).json(updatedTag);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el Tag" });
  }
};

// Eliminar Tag
const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Tag.destroy({
      where: { id },
    });

    if (!deleted) return res.status(404).json({ error: "Tag no encontrado" }); //SACAR CON MIDDLEWARE
    res.status(200).json({ message: "Tag eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el tag" });
  }
};

module.exports = { getTags, getTagById, createTag, updateTag, deleteTag };
