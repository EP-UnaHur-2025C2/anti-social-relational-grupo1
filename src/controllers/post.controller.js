const { Post, Tag } = require("../db/models");

// Obtener todos los posts (con tags opcionalmente)
const getPosts = async (_, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: Tag,
          as: "tags",
          through: { attributes: [] }, 
        },
      ],
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los posts",
      detalle: error.message,
    });
  }
};

// Obtener post por ID
const getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Tag,
          as: "tags",
          through: { attributes: [] },
        },
      ],
    });

    if (!post) return res.status(404).json({ error: "Post no encontrado" });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el post" });
  }
};

// Crear post (con tags opcionales)
const createPost = async (req, res) => {
  try {
    const { texto, tags } = req.body;

    if (!texto || texto.trim() === "") {
      return res.status(400).json({ error: "El post debe tener una descripción" });
    }

    const newPost = await Post.create({ texto });
    if (tags && Array.isArray(tags) && tags.length > 0) {
      await newPost.setTags(tags);
    }

    const postConTags = await Post.findByPk(newPost.id, {
      include: [{ model: Tag, as: "tags", through: { attributes: [] } }],
    });

    res.status(201).json(postConTags);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el post" });
  }
};

// Actualizar post (y sus tags opcionales)
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { texto, tags } = req.body;

    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ error: "Post no encontrado" });

    if (texto) await post.update({ texto });

    if (tags && Array.isArray(tags)) {
      await post.setTags(tags);
    }

    const updatedPost = await Post.findByPk(id, {
      include: [{ model: Tag, as: "tags", through: { attributes: [] } }],
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el post" });
  }
};

// Eliminar post
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Post.destroy({ where: { id } });

    if (!deleted) return res.status(404).json({ error: "Post no encontrado" });

    res.status(200).json({ message: "Post eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el post" });
  }
};

module.exports = { getPosts, getPostById, createPost, updatePost, deletePost };
