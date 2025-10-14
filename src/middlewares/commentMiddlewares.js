const { Comment } = require("../db/models")

// Verifica si existe el comentario
const commentExists = async (req, res, next) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findByPk(id);
        if (!comment) {
        return res.status(404).json({ error: "Comentario no encontrado" });
        }
        req.comment = comment; 
        next();
    } catch (error) {
        res.status(500).json({ error: "Error al verificar el comentario" });
    }
};

module.exports = { commentExists };