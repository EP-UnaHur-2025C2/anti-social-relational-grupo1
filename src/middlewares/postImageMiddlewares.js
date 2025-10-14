const { Post_images } = require("../db/models");

const imageExists = async (req, res, next) => {
    const { imageId } = req.params;
    const image = await Post_images.findByPk(imageId);
    if (!image) {
        return res.status(404).json({ message: "La imagen no existe" });
    }
    next();
};

module.exports = { imageExists };