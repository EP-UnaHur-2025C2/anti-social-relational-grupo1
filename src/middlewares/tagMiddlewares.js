const { Tag } = require("../db/models");

const existTag = async (req, res, next) => {
  try {
    const { nombre } = req.body;
    if (!nombre)
      return res.status(400).json({ error: "Se requiere un nombre de tag" });
    const found = await Tag.findOne({ where: { nombre } });
    if (found) return res.status(409).json({ error: "tag ya existente" });

    next();
  } catch (error) {
    res.status(500).json({ error: "Error al validar tag" });
  }
};

module.exports = { existTag };
