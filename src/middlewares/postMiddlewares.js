const { Post } = require("../db/models");

// Verifica que el post exista por ID
const postExists = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await Post.findByPk(id);

        if (!post) {
            return res.status(404).json({ error: "Post no encontrado" });
        }

        req.post = post;
        next();
    } catch (error) {
        res.status(500).json({ error: "Error al verificar el post" });
    }
};

module.exports = { postExists };
