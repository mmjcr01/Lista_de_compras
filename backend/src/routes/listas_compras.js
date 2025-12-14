const express = require('express');

module.exports = (models) => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const { page = 1, limit = 20, usuario_id, ativa } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    const where = {};
    if (usuario_id) where.usuario_id = usuario_id;
    if (ativa !== undefined) where.ativa = ativa === 'true';
    const itens = await models.ListaCompras.findAndCountAll({ where, limit: Number(limit), offset, order: [['data_criacao', 'DESC']] });
    res.json({ total: itens.count, page: Number(page), limit: Number(limit), data: itens.rows });
  });

  router.get('/:id', async (req, res) => {
    const lista = await models.ListaCompras.findByPk(req.params.id);
    if (!lista) return res.status(404).json({ error: 'Lista não encontrada' });
    res.json(lista);
  });

  router.post('/', async (req, res) => {
    const { lista_compras_id, usuario_id, nome } = req.body;
    if (!lista_compras_id || !usuario_id || !nome) return res.status(400).json({ error: 'lista_compras_id, usuario_id e nome são obrigatórios' });
    const usr = await models.Usuario.findByPk(usuario_id);
    if (!usr) return res.status(400).json({ error: 'usuario_id inválido' });
    const nova = await models.ListaCompras.create({ ...req.body });
    res.status(201).json(nova);
  });

  router.put('/:id', async (req, res) => {
    const lista = await models.ListaCompras.findByPk(req.params.id);
    if (!lista) return res.status(404).json({ error: 'Lista não encontrada' });
    await lista.update({ ...req.body });
    res.json(lista);
  });

  router.delete('/:id', async (req, res) => {
    const lista = await models.ListaCompras.findByPk(req.params.id);
    if (!lista) return res.status(404).json({ error: 'Lista não encontrada' });
    await lista.destroy();
    res.status(204).send();
  });

  return router;
};