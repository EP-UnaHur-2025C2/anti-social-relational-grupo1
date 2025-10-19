const addImagen = async (req, res) => {
    try {
        if (!req.file) {
        return res.status(400).json({ message: "No se subió ninguna imagen" });
        }

        const imageUrl = `/uploads/images/${req.file.filename}`;
        res.status(201).json({
        message: "Imagen subida correctamente",
        imageUrl,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al subir la imagen" });
    }
};

module.exports = { addImagen };