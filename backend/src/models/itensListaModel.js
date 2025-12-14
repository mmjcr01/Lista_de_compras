module.exports = (sequelize, DataTypes) => {
  const ItemLista = sequelize.define(
    "ItemLista",
    {
      item_lista_id: {
        type: DataTypes.STRING(36),
        allowNull: false,
        primaryKey: true,
      },
      lista_compras_id: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
      produto_id: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
      quantidade: {
        type: DataTypes.DECIMAL(8, 3),
        allowNull: false,
      },
      unidade: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      preco_estimado: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      comprado: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      ordem: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "itens_lista",
      timestamps: false,
      underscored: true,
    }
  );

  ItemLista.associate = (models) => {
    ItemLista.belongsTo(models.ListaCompras, { foreignKey: "lista_compras_id", as: "lista" });
    ItemLista.belongsTo(models.Produto, { foreignKey: "produto_id", as: "produto" });
  };

  return ItemLista;
};