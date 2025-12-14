module.exports = (sequelize, DataTypes) => {
  const ConfigUsuario = sequelize.define(
    "ConfigUsuario",
    {
      config_usuario_id: {
        type: DataTypes.STRING(36),
        allowNull: false,
        primaryKey: true,
      },
      usuario_id: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
      tema: {
        type: DataTypes.ENUM("claro", "escuro"),
        allowNull: true,
        defaultValue: "claro",
      },
      utilizar_localizacao: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      estado_preferido: {
        type: DataTypes.STRING(2),
        allowNull: true,
      },
      cidade_preferida: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      tableName: "config_usuario",
      timestamps: false,
      underscored: true,
    }
  );

  ConfigUsuario.associate = (models) => {
    ConfigUsuario.belongsTo(models.Usuario, {
      foreignKey: "usuario_id",
      as: "usuario",
      onDelete: "CASCADE",
    });
  };

  return ConfigUsuario;
};