const { Post_images } = require("../db/models");

// Verificar que venga la URL y el postId
const validateImageBody = (req, res, next) => {
    const { imageUrl, postId } = req.body;
    if (!imageUrl || !postId) {
        return res
            .status(400)
            .json({ error: "Faltan campos obligatorios: imageUrl y postId" });
    }
    next();
};

// Verificar que la imagen exista por ID
const checkImageExists = async (req, res, next) => {
    try {
        const image = await Post_images.findByPk(req.params.id);
        if (!image) {
            return res.status(404).json({ error: "Imagen no encontrada" });
        }
        req.image = image;
        next();
    } catch (error) {
        res.status(500).json({ error: "Error al verificar la imagen" });
    }
};

module.exports = { validateImageBody, checkImageExists };