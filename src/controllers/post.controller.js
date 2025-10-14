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
        {
          model: PostImage,
          as: "images",
          attributes: ["id", "url"]
        }
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
        {
          model: PostImage,
          as: "images",
          attributes: ["id", "url"]
        }
      ],
    });

    if (!post) return res.status(404).json({ error: "Post no encontrado" });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el post" });
  }
};

// Crear post
const createPost = async (req, res) => {
  try {
    const { texto, tags, images } = req.body;

    if (!texto || texto.trim() === "") {
      return res.status(400).json({ error: "El post debe tener una descripción" });
    }

    const newPost = await Post.create({ texto });

    if (tags && Array.isArray(tags) && tags.length > 0) {
      await newPost.setTags(tags);
    }

    if (images && Array.isArray(images) && images.length > 0) {
      const imageRecords = images.map((url) => ({ url, postId: newPost.id }));
      await PostImage.bulkCreate(imageRecords);
    }

    const postConTagsYImages = await Post.findByPk(newPost.id, {
      include: [
        { model: Tag, as: "tags", through: { attributes: [] } },
        { model: PostImage, as: "images", attributes: ["id", "url"] },
      ],
    });

    res.status(201).json(postConTagsYImages);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el post", detalle: error.message });
  }
};

// Actualizar post 
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { texto, tags, images } = req.body;

    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ error: "Post no encontrado" });
    if (texto) await post.update({ texto });
    if (tags && Array.isArray(tags)) {
      await post.setTags(tags);
    }

    // Reemplazar imágenes
    if (images && Array.isArray(images)) {
      await PostImage.destroy({ where: { postId: post.id } });
      const imageRecords = images.map((url) => ({ url, postId: post.id }));
      await PostImage.bulkCreate(imageRecords);
    }

    const updatedPost = await Post.findByPk(post.id, {
      include: [
        { model: Tag, as: "tags", through: { attributes: [] } },
        { model: PostImage, as: "images", attributes: ["id", "url"] },
      ],
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el post", detalle: error.message });
  }
};

// Eliminar post
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await PostImage.destroy({ where: { postId: id } });
    const deleted = await Post.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: "Post no encontrado" });

    res.status(200).json({ message: "Post eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el post", detalle: error.message });
  }
};

// Agregar una imagen a un post existente
const agregarImagenPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { url } = req.body;

    if (!url) return res.status(400).json({ error: "Se requiere la URL de la imagen" });
    const newImage = await PostImage.create({ url, postId: id });

    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar la imagen", detalle: error.message });
  }
};

// Eliminar una imagen de un post
const eliminarImagenDePost = async (req, res) => {
  try {
    const { id, imageId } = req.params;
    const deleted = await PostImage.destroy({
      where: { id: imageId, postId: id },
    });

    if (!deleted) return res.status(404).json({ error: "Imagen no encontrada" });

    res.status(200).json({ message: "Imagen eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la imagen", detalle: error.message });
  }
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  agregarImagenPost,
  eliminarImagenDePost,
};