const express = require("express");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

module.exports = (models) => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    const itens = await models.Usuario.findAndCountAll({
      limit: Number(limit),
      offset,
      order: [["nome", "ASC"]],
    });
    res.json({
      total: itens.count,
      page: Number(page),
      limit: Number(limit),
      data: itens.rows,
    });
  });

  router.get("/:id", async (req, res) => {
    const usuario = await models.Usuario.findByPk(req.params.id);
    if (!usuario)
      return res.status(404).json({ error: "Usuário não encontrado" });
    res.json(usuario);
  });

  router.post("/", async (req, res) => {
    const { email, senha, nome, estado, cidade } = req.body;
    if (!nome || !email || !senha || !estado || !cidade)
      return res.status(400).json({ error: "Campos obrigatórios" });
    const hashpassword = await bcrypt.hash(senha, 10);
    const novoUsuario = await models.Usuario.create({
      usuario_id: uuidv4(),
      ...req.body,
      senha_hash: hashpassword,
    });
    res.status(201).json(novoUsuario);
  });

  router.put("/:id", async (req, res) => {
    const usuario = await models.Usuario.findByPk(req.params.id);
    if (!usuario)
      return res.status(404).json({ error: "Usuário não encontrado" });
    await usuario.update({ ...req.body });
    res.json(usuario);
  });

  router.delete("/:id", async (req, res) => {
    const usuario = await models.Usuario.findByPk(req.params.id);
    if (!usuario)
      return res.status(404).json({ error: "Categoria não encontrada" });
    await usuario.destroy();
    res.status(204).send();
  });

  return router;
};
