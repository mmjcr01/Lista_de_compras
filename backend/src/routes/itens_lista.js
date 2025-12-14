const express = require('express');

module.exports = (models) => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const { page = 1, limit = 20, lista_compras_id, produto_id, comprado } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    const where = {};
    if (lista_compras_id) where.lista_compras_id = lista_compras_id;
    if (produto_id) where.produto_id = produto_id;
    if (comprado !== undefined) where.comprado = comprado === 'true';
    const itens = await models.ItemLista.findAndCountAll({ where, limit: Number(limit), offset, order: [['ordem', 'ASC']] });
    res.json({ total: itens.count, page: Number(page), limit: Number(limit), data: itens.rows });
  });

  router.get('/:id', async (req, res) => {
    const item = await models.ItemLista.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item de lista não encontrado' });
    res.json(item);
  });

  router.post('/', async (req, res) => {
    const { item_lista_id, lista_compras_id, produto_id, quantidade, unidade } = req.body;
    if (!item_lista_id || !lista_compras_id || !produto_id || !quantidade || !unidade) return res.status(400).json({ error: 'Campos obrigatórios ausentes' });
    const lista = await models.ListaCompras.findByPk(lista_compras_id);
    if (!lista) return res.status(400).json({ error: 'lista_compras_id inválido' });
    const prod = await models.Produto.findByPk(produto_id);
    if (!prod) return res.status(400).json({ error: 'produto_id inválido' });
    const novo = await models.ItemLista.create({ ...req.body });
    res.status(201).json(novo);
  });

  router.put('/:id', async (req, res) => {
    const item = await models.ItemLista.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item de lista não encontrado' });
    await item.update({ ...req.body });
    res.json(item);
  });

  router.delete('/:id', async (req, res) => {
    const item = await models.ItemLista.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item de lista não encontrado' });
    await item.destroy();
    res.status(204).send();
  });

  return router;
};