const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Rutas:
const userRoute = require("./routes/userRoute");

// Base de datos:
const dataBase = require("./db/models")["sequelize"];

// Para ejecutar:
app.use(express.json());
app.use("/user", userRoute);

// Listen (no se si esta bien):
app.listen(PORT, (err) => {
    if (err) {
        console.error(err.message);
        process.exit(1);
    }

    console.log(`App iniciada en el puerto ${PORT}`);
})
