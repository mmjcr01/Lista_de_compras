module.exports = (sequelize, DataTypes) => {
  const Estabelecimento = sequelize.define(
    "Estabelecimento",
    {
      estabelecimento_id: {
        type: DataTypes.STRING(36),
        allowNull: false,
        primaryKey: true,
      },
      nome: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      tipo_logradouro: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      logradouro: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      numero: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      bairro: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      cidade: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      estado: {
        type: DataTypes.STRING(2),
        allowNull: false,
      },
      cep: {
        type: DataTypes.STRING(9),
        allowNull: true,
      },
      latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true,
      },
      longitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: true,
      },
      ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
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
      tableName: "estabelecimentos",
      timestamps: false,
      underscored: true,
    }
  );

  return Estabelecimento;
};