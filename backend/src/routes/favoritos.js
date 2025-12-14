const express = require('express');

module.exports = (models) => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const { page = 1, limit = 20, usuario_id, tipo } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    const where = {};
    if (usuario_id) where.usuario_id = usuario_id;
    if (tipo) where.tipo = tipo;
    const itens = await models.Favorito.findAndCountAll({ where, limit: Number(limit), offset, order: [['created_at', 'DESC']] });
    res.json({ total: itens.count, page: Number(page), limit: Number(limit), data: itens.rows });
  });

  router.post('/', async (req, res) => {
    const { favoritos_id, usuario_id, tipo, produto_id, estabelecimento_id } = req.body;
    if (!favoritos_id || !usuario_id || !tipo) return res.status(400).json({ error: 'favoritos_id, usuario_id e tipo são obrigatórios' });
    if (tipo === 'produto' && !produto_id) return res.status(400).json({ error: 'produto_id é obrigatório quando tipo=produto' });
    if (tipo === 'estabelecimento' && !estabelecimento_id) return res.status(400).json({ error: 'estabelecimento_id é obrigatório quando tipo=estabelecimento' });
    const usr = await models.Usuario.findByPk(usuario_id);
    if (!usr) return res.status(400).json({ error: 'usuario_id inválido' });
    if (produto_id) {
      const prod = await models.Produto.findByPk(produto_id);
      if (!prod) return res.status(400).json({ error: 'produto_id inválido' });
    }
    if (estabelecimento_id) {
      const est = await models.Estabelecimento.findByPk(estabelecimento_id);
      if (!est) return res.status(400).json({ error: 'estabelecimento_id inválido' });
    }
    try {
      const novo = await models.Favorito.create({ ...req.body });
      res.status(201).json(novo);
    } catch (e) {
      return res.status(409).json({ error: 'Favorito já existe' });
    }
  });

  router.delete('/:id', async (req, res) => {
    const fav = await models.Favorito.findByPk(req.params.id);
    if (!fav) return res.status(404).json({ error: 'Favorito não encontrado' });
    await fav.destroy();
    res.status(204).send();
  });

  return router;
};