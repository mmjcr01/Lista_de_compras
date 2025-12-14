const express = require('express');

module.exports = (models) => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const { page = 1, limit = 20, usuario_id, tipo_busca } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    const where = {};
    if (usuario_id) where.usuario_id = usuario_id;
    if (tipo_busca) where.tipo_busca = tipo_busca;
    const itens = await models.HistoricoBusca.findAndCountAll({ where, limit: Number(limit), offset, order: [['created_at', 'DESC']] });
    res.json({ total: itens.count, page: Number(page), limit: Number(limit), data: itens.rows });
  });

  router.post('/', async (req, res) => {
    const { historico_buscas_id, usuario_id, termo_busca, tipo_busca } = req.body;
    if (!historico_buscas_id || !usuario_id || !termo_busca || !tipo_busca) return res.status(400).json({ error: 'Campos obrigatórios ausentes' });
    const usr = await models.Usuario.findByPk(usuario_id);
    if (!usr) return res.status(400).json({ error: 'usuario_id inválido' });
    const novo = await models.HistoricoBusca.create({ ...req.body });
    res.status(201).json(novo);
  });

  router.delete('/:id', async (req, res) => {
    const hist = await models.HistoricoBusca.findByPk(req.params.id);
    if (!hist) return res.status(404).json({ error: 'Registro não encontrado' });
    await hist.destroy();
    res.status(204).send();
  });

  return router;
};