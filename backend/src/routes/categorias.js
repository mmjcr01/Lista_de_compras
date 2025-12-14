const express = require('express');

module.exports = (models) => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    const itens = await models.Categoria.findAndCountAll({ limit: Number(limit), offset, order: [['nome', 'ASC']] });
    res.json({ total: itens.count, page: Number(page), limit: Number(limit), data: itens.rows });
  });

  router.get('/:id', async (req, res) => {
    const cat = await models.Categoria.findByPk(req.params.id);
    if (!cat) return res.status(404).json({ error: 'Categoria não encontrada' });
    res.json(cat);
  });

  router.post('/', async (req, res) => {
    const { categoria_id, nome } = req.body;
    if (!categoria_id || !nome) return res.status(400).json({ error: 'categoria_id e nome são obrigatórios' });
    const nova = await models.Categoria.create({ ...req.body });
    res.status(201).json(nova);
  });

  router.put('/:id', async (req, res) => {
    const cat = await models.Categoria.findByPk(req.params.id);
    if (!cat) return res.status(404).json({ error: 'Categoria não encontrada' });
    await cat.update({ ...req.body });
    res.json(cat);
  });

  router.delete('/:id', async (req, res) => {
    const cat = await models.Categoria.findByPk(req.params.id);
    if (!cat) return res.status(404).json({ error: 'Categoria não encontrada' });
    await cat.destroy();
    res.status(204).send();
  });

  return router;
};