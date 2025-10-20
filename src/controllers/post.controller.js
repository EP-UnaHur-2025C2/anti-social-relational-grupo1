const { sequelize } = require("../db/models");
const { Post, Post_images, Tag, Comment } = require("../db/models");
const { Op } = require("sequelize");

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
const COMMENT_VISIBLE_MESES = parseInt(process.env.COMMENT_VISIBLE_MESES);
const getLimiteVisible = () => {
  const date = new Date();
  // Subtract the configurable number of months
  date.setMonth(date.getMonth() - COMMENT_VISIBLE_MESES);
  return date;
};
const getPostById = async (req, res) => {
  try {
    const limiteVisible = getLimiteVisible();
    const { id } = req.params;
    const post = await Post.findByPk(id, {
      include: [
        { model: Post_images },
        {
          model: Tag,
          as: "tags",
        },
        {
          model: Comment,
          as: "comments", // Use the correct alias for the Comment association (e.g., 'comments')
          /*required: false, // Use false so the Post is returned even if it has no comments
          where: {
            // FILTERING LOGIC: Only include comments where createdAt >= cutOffDate
            createdAt: {
              [Op.gte]: limiteVisible, // Greater than or Equal to (the cut-off date)
            },
          },*/
          // Optional: You might want to sort them (e.g., newest first)
        },
      ],
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el post", error });
  }
};

// Crear un nuevo post
const createPost = async (req, res) => {
  /*try {
    const { texto } = req.body;
    const newPost = await Post.create({ texto });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el post", error });
  }
};*/
  const { texto, tags, postimages } = req.body;
  const userId = req.user.id;
  try {
    // 1. Asegura que 'tags' sea un array (o un array vacío si no se envió)
    const safeTags = Array.isArray(tags) ? tags : [];

    // 2. Asegura que 'postimages' sea un array (o un array vacío si no se envió)
    const safeImages = Array.isArray(postimages) ? postimages : [];
    // Inicia una transacción para agrupar todas las operaciones de DB
    await sequelize.transaction(async (t) => {
      // 1. Crea el Post dentro de la transacción
      const posteo = await Post.create({ texto, userId }, { transaction: t });

      // 2. Procesa las etiquetas y las imágenes en paralelo de forma segura
      const tagPromises = safeTags.map((tagData) => {
        return Tag.findOrCreate({
          where: { nombre: tagData.nombre },
          defaults: tagData,
          transaction: t, // <-- ¡Importante! Pasar la transacción aquí
        });
      });

      const imagesPromises = safeImages.map((imagesData) => {
        return Post_images.findOrCreate({
          where: { url: imagesData.url },
          defaults: imagesData,
          transaction: t, // <-- ¡Importante! Pasar la transacción aquí
        });
      });

      // 3. Espera a que todas las promesas se resuelvan
      const tagResults = await Promise.all(tagPromises);
      const imagesResults = await Promise.all(imagesPromises);

      // 4. Extrae solo las instancias
      const tagInstances = tagResults.map(([tagInstance]) => tagInstance);
      const imagesInstances = imagesResults.map(
        ([imagesInstance]) => imagesInstance
      );

      // 5. Asocia las instancias con el post dentro de la transacción
      await posteo.addTags(tagInstances, { transaction: t });
      await posteo.addPost_images(imagesInstances, { transaction: t });

      // 6. Obtiene el post completo para la respuesta, también dentro de la transacción
      const postWithCompleto = await Post.findOne({
        where: { id: posteo.id },
        include: [
          {
            model: Tag,
            as: "tags",
          },
          {
            model: Post_images,
          },
        ],
        transaction: t, // <-- ¡Importante! Pasar la transacción aquí
      });

      // La transacción se commite automáticamente aquí si no hay errores
      res.status(201).json(postWithCompleto);
    });
  } catch (error) {
    console.error("Error al crear el post:", error);
    // Si hay un error, la transacción se revierte automáticamente
    res.status(500).json({ error: "Ocurrió un error al crear el post." });
  }
};

// Actualizar un post existente
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { texto } = req.body;
    const post = await Post.findByPk(id);

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

    await Post_images.destroy({ where: { postId: id } });
    await post.destroy();
    res.status(200).json({ message: "Post eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el post", error });
  }
};

const addTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { tagId } = req.body;
    const post = await Post.findByPk(id);
    const tag = await Tag.findByPk(tagId);

    const newTag = await post.addTag(tag);

    res.status(200).json({ message: "Tag/s añadido/s correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al añadir el tag", error });
  }
};

const getTagsInPost = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Post.findOne({
      where: { id },
      include: [
        {
          model: Tag,
          as: "tags",
          attributes: ["id", "nombre"],
          through: { attributes: [] },
        },
      ],
    });

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los tags", error });
  }
};

const getImagesFromPost = async (req, res) => {
  try {
    const { id } = req.params;
    const images = await Post_images.findAll({ where: { id } });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener imágenes", error });
  }
};

// Agregar imagen a un post
const addImageToPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { url } = req.body;

    const image = await Post_images.create({ url });
    const post = await Post.findByPk(id);
    const porLasDudas = await post.addPost_images(image);
    res.status(201).json(post);
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
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  addTag,
  getTagsInPost,
  getImagesFromPost,
  addImageToPost,
  deleteImageFromPost,
};
