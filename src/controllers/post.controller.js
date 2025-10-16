const { Post, Post_images } = require("../db/models");

// Obtener todos los posts
const getPosts = async (_, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: Post_images }],
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los posts", error });
  }
};

// Obtener un post por ID
const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id, {
      include: [{ model: Post_images }],
    });
    if (!post) return res.status(404).json({ message: "Post no encontrado" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el post", error });
  }
};

// Crear un nuevo post
const createPost = async (req, res) => {
  try {
    const { texto } = req.body;
    const newPost = await Post.create({ texto });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el post", error });
  }
};

// Actualizar un post existente
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { texto } = req.body;
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ message: "Post no encontrado" });

    await post.update({ texto });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el post", error });
  }
};

// Eliminar un post y sus imágenes 
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ message: "Post no encontrado" });

    await Post_images.destroy({ where: { postId: id } });
    await post.destroy();
    res.status(200).json({ message: "Post eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el post", error });
  }
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};