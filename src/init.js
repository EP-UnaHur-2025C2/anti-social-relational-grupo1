const { text } = require("express");

const init = async () => {
  const db = require("./db/models").sequelize;
  const { User, Post, Tag } = require("./db/models");
  await db.sync({ force: true });

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
  });

  const post2 = await Post.create({
    texto: "posteo2abdcdefghi",
  });
  const tag1 = await Tag.create({
    nombre: "tag 1",
  });
};

module.exports = init;
