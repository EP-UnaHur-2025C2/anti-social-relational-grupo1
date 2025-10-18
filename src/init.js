const { User, Post, Tag, Comment } = require("./db/models");

const init = async () => {
  try {
    // Conexión y sincronización:
    const db = require("./db/models").sequelize;
    await db.sync({ force: true });
    console.log("Base de datos conectada y sincronizada");

    // Datos iniciales de ejemplo:
    const user1 = await User.create({
      nickname: "user1",
      mail: "user1@gmail.com",
    });

    const user2 = await User.create({
      nickname: "user2",
      mail: "user2@gmail.com",
    });

    const post1 = await Post.create({
      texto: "posteo1abcdefghi",
      userId: 1,
    });

    const post2 = await Post.create({
      texto: "posteo2abdcdefghi",
      userId: 2,
    });

    const tag1 = await Tag.create({ nombre: "tag1" });
    const tag2 = await Tag.create({ nombre: "tag2" });

    const comment = await Comment.create({
      texto: "Un comentario",
      visible: true,
    });

    // Asociar tags a un post:
    await post1.addTag(tag1);
    await post2.addTags([tag1, tag2]);

    console.log("Datos iniciales cargados correctamente");
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error.message);
    throw error;
  }
};

module.exports = init;
