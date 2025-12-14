module.exports = (sequelize, DataTypes) => {
  const Favorito = sequelize.define(
    "Favorito",
    {
      favoritos_id: {
        type: DataTypes.STRING(36),
        allowNull: false,
        primaryKey: true,
      },
      usuario_id: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
      produto_id: {
        type: DataTypes.STRING(36),
        allowNull: true,
      },
      estabelecimento_id: {
        type: DataTypes.STRING(36),
        allowNull: true,
      },
      tipo: {
        type: DataTypes.ENUM("produto", "estabelecimento"),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "favoritos",
      timestamps: false,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ["usuario_id", "produto_id", "estabelecimento_id"],
          name: "unique_favorito",
        },
      ],
    }
  );

  Favorito.associate = (models) => {
    Favorito.belongsTo(models.Usuario, { foreignKey: "usuario_id", as: "usuario", onDelete: "CASCADE" });
    Favorito.belongsTo(models.Produto, { foreignKey: "produto_id", as: "produto" });
    Favorito.belongsTo(models.Estabelecimento, { foreignKey: "estabelecimento_id", as: "estabelecimento" });
  };

  return Favorito;
};