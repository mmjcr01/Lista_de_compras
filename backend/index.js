// backend/index.js
require("dotenv").config();
const express = require("express");
const { Sequelize } = require("sequelize");
const { initModels } = require("./src/models");
const swaggerUi = require("swagger-ui-express");
const openapiSpec = require("./src/docs/openapi.json");

const app = express();
app.use(express.json());

const sequelize = new Sequelize(
  process.env.DB_NAME || "ListaDeCompras",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "Michel123",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false,
  }
);

const models = initModels(sequelize);

const categoriasRouter = require("./src/routes/categorias");
const produtosRouter = require("./src/routes/produtos");
const precosRouter = require("./src/routes/precos");
const estabelecimentosRouter = require("./src/routes/estabelecimentos");
const listasRouter = require("./src/routes/listas_compras");
const itensRouter = require("./src/routes/itens_lista");
const favoritosRouter = require("./src/routes/favoritos");
const historicoRouter = require("./src/routes/historico_buscas");
const usuariosRouter = require("./src/routes/usuarios");
const loginRouter = require("./src/routes/login");
const authMiddleware = require("./src/auth/auth");

async function bootstrap() {
  try {
    await sequelize.authenticate();
    console.log("Sequelize conectado ao MySQL com sucesso");

    const port = process.env.PORT || 3000;
    app.get("/health", (req, res) => res.json({ ok: true }));
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));
    app.use("/api/categorias", categoriasRouter(models));
    app.use("/api/produtos", produtosRouter(models));
    app.use("/api/precos", precosRouter(models));
    app.use("/api/estabelecimentos", estabelecimentosRouter(models));

    // Rotas protegidas (precisam de token JWT)
    app.use("/api/listas_compras", authMiddleware, listasRouter(models));
    app.use("/api/itens_lista", authMiddleware, itensRouter(models));
    app.use("/api/favoritos", authMiddleware, favoritosRouter(models));
    app.use("/api/historico_buscas", authMiddleware, historicoRouter(models));

    // Rotas públicas
    app.use("/api/usuarios", usuariosRouter(models));
    app.use("/api/login", loginRouter(models));

    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  } catch (err) {
    console.error("Erro ao inicializar:", err);
    process.exit(1);
  }
}

bootstrap();

module.exports = { sequelize, models, app };
