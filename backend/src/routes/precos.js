const express = require('express');

module.exports = (models) => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const { page = 1, limit = 20, produto_id, estabelecimento_id, usuario_id } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    const where = {};
    if (produto_id) where.produto_id = produto_id;
    if (estabelecimento_id) where.estabelecimento_id = estabelecimento_id;
    if (usuario_id) where.usuario_id = usuario_id;
    const itens = await models.Preco.findAndCountAll({ where, limit: Number(limit), offset, order: [['data_coleta', 'DESC']], include: [{ model: models.Produto, as: 'produto' }, { model: models.Estabelecimento, as: 'estabelecimento' }, { model: models.Usuario, as: 'usuario' }] });
    res.json({ total: itens.count, page: Number(page), limit: Number(limit), data: itens.rows });
  });

  router.post('/', async (req, res) => {
    const { preco_id, produto_id, estabelecimento_id, usuario_id, preco } = req.body;
    if (!preco_id || !produto_id || !estabelecimento_id || !usuario_id || !preco) return res.status(400).json({ error: 'Campos obrigatórios: preco_id, produto_id, estabelecimento_id, usuario_id, preco' });
    const prod = await models.Produto.findByPk(produto_id);
    if (!prod) return res.status(400).json({ error: 'produto_id inválido' });
    const est = await models.Estabelecimento.findByPk(estabelecimento_id);
    if (!est) return res.status(400).json({ error: 'estabelecimento_id inválido' });
    const usr = await models.Usuario.findByPk(usuario_id);
    if (!usr) return res.status(400).json({ error: 'usuario_id inválido' });
    const novo = await models.Preco.create({ ...req.body });
    res.status(201).json(novo);
  });

  return router;
};