const express = require("express");
const app = express();
const PORT = process.env.PORT ?? 3000;

const init = require('./init')

// Rutas:
const userRoute = require("./routes/user.route");
const postRoute = require("./routes/post.route");

// Base de datos:
const dataBase = require("./db/models")["sequelize"];

// Para ejecutar:
app.use(express.json());
app.use("/user", userRoute);
app.use("/post", postRoute);

// Listen (no se si esta bien):
app.listen(PORT, async(err) => {
    if (err) {
        console.error(err.message);
        process.exit(1);
    }
    await init();
    console.log(`App iniciada en el puerto ${PORT}`);
})