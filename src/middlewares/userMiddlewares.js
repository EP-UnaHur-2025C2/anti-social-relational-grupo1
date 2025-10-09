const { User } = require("../db/models");

const existUserName = async (req, res, next) => {
  try {
    const { nickname } = req.body;
    if (!nickname)
      return res.status(400).json({ error: "Se requiere un nickName" });

    const found = await User.findOne({ where: { nickname } });
    if (found) return res.status(409).json({ error: "nickName ya existe" });

    next();
  } catch (error) {
    res.status(500).json({ error: "Error al validar nickName" });
  }
};

module.exports = { existUserName };
