module.exports = (sequelize, DataTypes) => {
  const Preco = sequelize.define(
    "Preco",
    {
      preco_id: {
        type: DataTypes.STRING(36),
        allowNull: false,
        primaryKey: true,
      },
      produto_id: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
      estabelecimento_id: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
      usuario_id: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
      preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      data_coleta: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true,
      },
      longitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: true,
      },
      validado: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "precos",
      timestamps: false,
      underscored: true,
    }
  );

  Preco.associate = (models) => {
    Preco.belongsTo(models.Produto, { foreignKey: "produto_id", as: "produto" });
    Preco.belongsTo(models.Estabelecimento, { foreignKey: "estabelecimento_id", as: "estabelecimento" });
    Preco.belongsTo(models.Usuario, { foreignKey: "usuario_id", as: "usuario" });
  };

  return Preco;
};