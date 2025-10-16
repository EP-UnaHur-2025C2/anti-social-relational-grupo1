const { Post_images } = require("../db/models");

// Obtener todas las imágenes de un post
const getImagesFromPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const images = await Post_images.findAll({ where: { postId } });
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener imágenes", error });
    }
};

// Agregar imagen a un post
const addImageToPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { url } = req.body;
        if (!url) return res.status(400).json({ message: "La URL es obligatoria" });

        const image = await Post_images.create({ postId, url });
        res.status(201).json(image);
    } catch (error) {
        res.status(500).json({ message: "Error al agregar imagen", error });
    }
};

// Eliminar imagen de un post
const deleteImageFromPost = async (req, res) => {
    try {
        const { imageId } = req.params;
        await Post_images.destroy({ where: { id: imageId } });
        res.status(200).json({ message: "Imagen eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar imagen", error });
    }
};

module.exports = {
    getImagesFromPost,
    addImageToPost,
    deleteImageFromPost
};