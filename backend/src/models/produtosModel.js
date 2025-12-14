module.exports = (sequelize, DataTypes) => {
  const Produto = sequelize.define(
    "Produto",
    {
      produto_id: {
        type: DataTypes.STRING(36),
        allowNull: false,
        primaryKey: true,
      },
      ean: {
        type: DataTypes.STRING(13),
        allowNull: true,
        unique: true,
      },
      nome: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      nome_normalizado: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      descricao: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      unidade: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      categoria_id: {
        type: DataTypes.STRING(36),
        allowNull: true,
      },
      imagem_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "produtos",
      timestamps: false,
      underscored: true,
    }
  );

  Produto.associate = (models) => {
    Produto.belongsTo(models.Categoria, {
      foreignKey: "categoria_id",
      as: "categoria",
    });
  };

  return Produto;
};