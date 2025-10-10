const { Post_images } = require("../db/models");

// Todos los Post_images
const getPost_images = async (_, res) => {
  try {
    const data = await Post_images.findAll({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los Post_images",
      detalle: error.message,
    });
  }
};

// Post_image por id
const getPost_imageById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundPost_image = await Post_images.findByPk(id);

    if (!foundPost_image)
      return res.status(404).json({ error: "Post_image no encontrado" });
    res.status(200).json(foundPost_image);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el Post_image" });
  }
};

// Crear Post_image
const createPost_image = async (req, res) => {
  try {
    const newPost_image = await Post_images.create(req.body);

    res.status(200).json(newPost_image);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el Post_image" });
  }
};

// Actualizar Post_image con id
const updatePost_image = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Post_images.update(req.body, { where: { id } });
    if (updated[0] === 0)
      return res.status(404).json({ error: "Post_image no encontrado" });

    const updatedPost_image = await Post_images.findByPk(id);
    res.status(200).json(updatedPost_image);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el Post_image" });
  }
};

// Eliminar Post_image
const deletePost_image = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Post_images.destroy({
      where: { id },
    });

    if (!deleted)
      return res.status(404).json({ error: "Post_image no encontrado" });
    res.status(200).json({ message: "Post_image eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el Post_image" });
  }
};

module.exports = {
  getPost_images,
  getPost_imageById,
  createPost_image,
  updatePost_image,
  deletePost_image,
};
