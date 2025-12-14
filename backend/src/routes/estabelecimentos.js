const express = require('express');

module.exports = (models) => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const { page = 1, limit = 20, cidade, estado, nome } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    const where = {};
    if (cidade) where.cidade = cidade;
    if (estado) where.estado = estado;
    if (nome) where.nome = { [require('sequelize').Op.like]: `%${nome}%` };
    const itens = await models.Estabelecimento.findAndCountAll({ where, limit: Number(limit), offset, order: [['nome', 'ASC']] });
    res.json({ total: itens.count, page: Number(page), limit: Number(limit), data: itens.rows });
  });

  router.get('/:id', async (req, res) => {
    const est = await models.Estabelecimento.findByPk(req.params.id);
    if (!est) return res.status(404).json({ error: 'Estabelecimento não encontrado' });
    res.json(est);
  });

  router.post('/', async (req, res) => {
    const { estabelecimento_id, nome, logradouro, bairro, cidade, estado } = req.body;
    if (!estabelecimento_id || !nome || !logradouro || !bairro || !cidade || !estado) return res.status(400).json({ error: 'Campos obrigatórios ausentes' });
    const novo = await models.Estabelecimento.create({ ...req.body });
    res.status(201).json(novo);
  });

  router.put('/:id', async (req, res) => {
    const est = await models.Estabelecimento.findByPk(req.params.id);
    if (!est) return res.status(404).json({ error: 'Estabelecimento não encontrado' });
    await est.update({ ...req.body });
    res.json(est);
  });

  router.delete('/:id', async (req, res) => {
    const est = await models.Estabelecimento.findByPk(req.params.id);
    if (!est) return res.status(404).json({ error: 'Estabelecimento não encontrado' });
    await est.destroy();
    res.status(204).send();
  });

  return router;
};