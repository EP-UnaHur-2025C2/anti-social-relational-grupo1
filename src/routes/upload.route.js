const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");
const { addImagen } = require("../controllers/upload.controller");

router.post("/", upload.single("image"), addImagen);
module.exports = router;