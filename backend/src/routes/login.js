const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = (models) => {
  const router = express.Router();

  router.post("/", async (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha)
      return res.status(400).json({ error: "Campos obrigatórios" });

    const usuario = await models.Usuario.findOne({ where: { email } });
    if (!usuario)
      return res.status(404).json({ error: "Usuário não encontrado" });

    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
    if (!senhaValida) return res.status(403).json({ error: "Senha inválida" });

    const token = jwt.sign(
      { id: usuario.usuario_id },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
    console.log(token);
    res.json({ token });
  });

  return router;
};
