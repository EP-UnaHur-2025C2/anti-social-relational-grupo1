const express = require("express");
const app = express();
const PORT = process.env.PORT ?? 3000;
const init = require("./init");

// Rutas:
const userRoute = require("./routes/user.route");
const postRoute = require("./routes/post.route");
const tagRoute = require("./routes/tag.route");
const commentRoute = require("./routes/comment.route");
const uploadRoute = require("./routes/upload.route");
const imagesRoute = require("./routes/post_Image.route");

// Swagger (http://localhost:3000/api-docs):
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");
const swaggerDocument = YAML.load(path.join(__dirname, "./docs/swagger.yaml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Bonus: Hace el upload de las imganes que se asocian a un POST que lo guarden en una carpeta de imagenes dentro del servidor web.
// Usar libreria "multer".
app.use("/uploads", express.static("uploads"));

// Base de datos:
const dataBase = require("./db/models")["sequelize"];

// Para ejecutar:
app.use(express.json());

// EndPoints:
app.use("/images", imagesRoute);
app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/tag", tagRoute);
app.use("/comment", commentRoute);
app.use("/upload", uploadRoute);

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
