module.exports = (sequelize, DataTypes) => {
  const HistoricoBusca = sequelize.define(
    "HistoricoBusca",
    {
      historico_buscas_id: {
        type: DataTypes.STRING(36),
        allowNull: false,
        primaryKey: true,
      },
      usuario_id: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
      termo_busca: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      tipo_busca: {
        type: DataTypes.ENUM("produto", "codigo_barras"),
        allowNull: false,
      },
      resultados_encontrados: {
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
      tableName: "historico_buscas",
      timestamps: false,
      underscored: true,
    }
  );

  HistoricoBusca.associate = (models) => {
    HistoricoBusca.belongsTo(models.Usuario, { foreignKey: "usuario_id", as: "usuario", onDelete: "CASCADE" });
  };

  return HistoricoBusca;
};