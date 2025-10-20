const { Comment, Post, User } = require("../db/models");
const { Op } = require("sequelize");

// Variable de entorno para la cantidad de meses visibles:
const COMMENT_VISIBLE_MESES = parseInt(process.env.COMMENT_VISIBLE_MESES);

// Calcular la fecha límite para comentarios visibles:
const getLimiteVisible = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - COMMENT_VISIBLE_MESES);
  return date;
};

// Obtener todos los comentarios visibles:
const getComments = async (_, res) => {
  try {
    const limiteVisible = getLimiteVisible();
    const data = await Comment.findAll({});

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los comentarios" });
  }
};

// Obtener comentario por ID:
const getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);

    const limiteVisible = getLimiteVisible();

    if (comment.createdAt < limiteVisible || !comment.visible) {
      return res.status(403).json({ error: "Comentario no visible" });
    }

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el comentario" });
  }
};

// Crear un comentario:
const createComment = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const { texto } = req.body;
    const userId = req.user.id;

    const post = await Post.findByPk(postId);

    const newComment = await Comment.create({
      texto,
      userId,
      postId,
    });

    await post.addComment(newComment);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el comentario" });
  }
};

// Actualizar comentario:
const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { texto, visible } = req.body;

    const comment = await Comment.findByPk(id);

    await comment.update({ texto, visible });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el comentario" });
  }
};

// Eliminar comentario:
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    await Comment.destroy({ where: { id } });

    res.status(200).json({ message: "Comentario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el comentario" });
  }
};

module.exports = {
  getComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
};
