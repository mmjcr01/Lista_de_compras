const express = require('express');

module.exports = (models) => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const { page = 1, limit = 20, categoria_id, q } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    const where = {};
    if (categoria_id) where.categoria_id = categoria_id;
    if (q) where.nome = { [require('sequelize').Op.like]: `%${q}%` };
    const itens = await models.Produto.findAndCountAll({ where, limit: Number(limit), offset, order: [['nome', 'ASC']], include: [{ model: models.Categoria, as: 'categoria' }] });
    res.json({ total: itens.count, page: Number(page), limit: Number(limit), data: itens.rows });
  });

  router.get('/:id', async (req, res) => {
    const prod = await models.Produto.findByPk(req.params.id, { include: [{ model: models.Categoria, as: 'categoria' }] });
    if (!prod) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json(prod);
  });

  router.post('/', async (req, res) => {
    const { produto_id, nome, nome_normalizado, unidade, categoria_id } = req.body;
    if (!produto_id || !nome || !nome_normalizado || !unidade) return res.status(400).json({ error: 'Campos obrigatórios: produto_id, nome, nome_normalizado, unidade' });
    if (categoria_id) {
      const cat = await models.Categoria.findByPk(categoria_id);
      if (!cat) return res.status(400).json({ error: 'categoria_id inválido' });
    }
    const novo = await models.Produto.create({ ...req.body });
    res.status(201).json(novo);
  });

  router.put('/:id', async (req, res) => {
    const prod = await models.Produto.findByPk(req.params.id);
    if (!prod) return res.status(404).json({ error: 'Produto não encontrado' });
    const { categoria_id } = req.body;
    if (categoria_id) {
      const cat = await models.Categoria.findByPk(categoria_id);
      if (!cat) return res.status(400).json({ error: 'categoria_id inválido' });
    }
    await prod.update({ ...req.body });
    res.json(prod);
  });

  router.delete('/:id', async (req, res) => {
    const prod = await models.Produto.findByPk(req.params.id);
    if (!prod) return res.status(404).json({ error: 'Produto não encontrado' });
    await prod.destroy();
    res.status(204).send();
  });

  return router;
};