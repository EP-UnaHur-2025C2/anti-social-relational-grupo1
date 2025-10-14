const express = require("express");
const app = express();
const PORT = process.env.PORT ?? 3000;
const init = require("./init");

// Rutas:
const userRoute = require("./routes/user.route");
const postRoute = require("./routes/post.route");
const tagRoute = require("./routes/tag.route");
const commentRoute = require("./routes/comment.route");

// Base de datos:
const dataBase = require("./db/models")["sequelize"];

// Para ejecutar:
app.use(express.json());

// EndPoints:
app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/tag", tagRoute);
app.use("/comment", commentRoute);

// Iniciar DB y levantar el servidor:
init()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App iniciada en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error al inicial la app:", err.message);
    process.exit(1);
  });
