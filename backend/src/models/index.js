// backend/src/models/index.js
const { DataTypes } = require('sequelize');

function initModels(sequelize) {
  const models = {};
  models.Usuario = require('./usuariosModel')(sequelize, DataTypes);
  models.Categoria = require('./categoriasModel')(sequelize, DataTypes);
  models.Produto = require('./produtosModel')(sequelize, DataTypes);
  models.Estabelecimento = require('./estabelecimentosModel')(sequelize, DataTypes);
  models.Preco = require('./precosModel')(sequelize, DataTypes);
  models.ListaCompras = require('./listasComprasModel')(sequelize, DataTypes);
  models.ItemLista = require('./itensListaModel')(sequelize, DataTypes);
  models.Favorito = require('./favoritosModel')(sequelize, DataTypes);
  models.HistoricoBusca = require('./historicoBuscasModel')(sequelize, DataTypes);
  models.ConfigUsuario = require('./configUsuarioModel')(sequelize, DataTypes);

  Object.values(models).forEach((m) => m.associate && m.associate(models));
  return models;
}

module.exports = { initModels };