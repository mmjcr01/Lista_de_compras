module.exports = (sequelize, DataTypes) => {
  const ListaCompras = sequelize.define(
    "ListaCompras",
    {
      lista_compras_id: {
        type: DataTypes.STRING(36),
        allowNull: false,
        primaryKey: true,
      },
      usuario_id: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
      nome: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      orcamento_total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      data_criacao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      data_atualizacao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      ativa: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
    },
    {
      tableName: "listas_compras",
      underscored: true,
      timestamps: true,
      createdAt: "data_criacao",
      updatedAt: "data_atualizacao",
    }
  );

  ListaCompras.associate = (models) => {
    ListaCompras.belongsTo(models.Usuario, {
      foreignKey: "usuario_id",
      as: "usuario",
      onDelete: "CASCADE",
    });
  };

  return ListaCompras;
};