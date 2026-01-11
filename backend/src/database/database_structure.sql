create database lista_de_compras;
use lista_de_compras;

-- USUÁRIOS
CREATE TABLE usuarios (
    usuario_id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha_hash VARCHAR(255),
    nome VARCHAR(100) NOT NULL,
    estado VARCHAR(2) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    foto_url TEXT,
    google_id VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- CONFIGURAÇÕES DO USUÁRIO
CREATE TABLE config_usuario (
    config_usuario_id VARCHAR(36) PRIMARY KEY,
    usuario_id VARCHAR(36) NOT NULL,
    tema ENUM('claro', 'escuro') DEFAULT 'claro',
    utilizar_localizacao BOOLEAN DEFAULT true,
    estado_preferido VARCHAR(2),
    cidade_preferida VARCHAR(100),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id) ON DELETE CASCADE
);

-- CATEGORIAS DE PRODUTOS
CREATE TABLE categorias (
    categoria_id VARCHAR(36) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    icone VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PRODUTOS (dados mestres)
CREATE TABLE produtos (
    produto_id VARCHAR(36) PRIMARY KEY,
    ean VARCHAR(13) UNIQUE,
    nome VARCHAR(255) NOT NULL,
    nome_normalizado VARCHAR(255) NOT NULL,
    descricao TEXT,
    unidade VARCHAR(50) NOT NULL, -- 'un', 'kg', 'l', 'pacote'
    categoria_id VARCHAR(36),
    imagem_url TEXT,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias(categoria_id)
);

-- ESTABELECIMENTOS
CREATE TABLE estabelecimentos (
    estabelecimento_id VARCHAR(36) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    tipo_logradouro VARCHAR(50),
    logradouro VARCHAR(255) NOT NULL,
    numero VARCHAR(20),
    bairro VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado VARCHAR(2) NOT NULL,
    cep VARCHAR(9),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    ativo BOOLEAN DEFAULT true,
    validado BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PREÇOS (entradas principais)
CREATE TABLE precos (
    preco_id VARCHAR(36) PRIMARY KEY,
    produto_id VARCHAR(36) NOT NULL,
    estabelecimento_id VARCHAR(36) NOT NULL,
    usuario_id VARCHAR(36) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    data_coleta TIMESTAMP NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    validado BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (produto_id) REFERENCES produtos(produto_id),
    FOREIGN KEY (estabelecimento_id) REFERENCES estabelecimentos(estabelecimento_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id)
);

-- LISTAS DE COMPRAS
CREATE TABLE listas_compras (
    lista_compras_id VARCHAR(36) PRIMARY KEY,
    usuario_id VARCHAR(36) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    orcamento_total DECIMAL(10, 2),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ativa BOOLEAN DEFAULT true,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id) ON DELETE CASCADE
);

-- ITENS DA LISTA DE COMPRAS
CREATE TABLE itens_lista (
    item_lista_id VARCHAR(36) PRIMARY KEY,
    lista_compras_id VARCHAR(36) NOT NULL,
    produto_id VARCHAR(36) NOT NULL,
    quantidade DECIMAL(8, 3) NOT NULL, -- 999.999
    unidade VARCHAR(20) NOT NULL,
    preco_estimado DECIMAL(10, 2),
    comprado BOOLEAN DEFAULT false,
    ordem INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lista_compras_id) REFERENCES listas_compras(lista_compras_id) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produtos(produto_id)
);

-- FAVORITOS
CREATE TABLE favoritos (
    favoritos_id VARCHAR(36) PRIMARY KEY,
    usuario_id VARCHAR(36) NOT NULL,
    produto_id VARCHAR(36),
    estabelecimento_id VARCHAR(36),
    tipo ENUM('produto', 'estabelecimento') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produtos(produto_id),
    FOREIGN KEY (estabelecimento_id) REFERENCES estabelecimentos(estabelecimento_id),
    UNIQUE KEY unique_favorito (usuario_id, produto_id, estabelecimento_id)
);

-- HISTÓRICO DE BUSCAS
CREATE TABLE historico_buscas (
    historico_buscas_id VARCHAR(36) PRIMARY KEY,
    usuario_id VARCHAR(36) NOT NULL,
    termo_busca VARCHAR(255) NOT NULL,
    tipo_busca ENUM('produto', 'codigo_barras') NOT NULL,
    resultados_encontrados INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id) ON DELETE CASCADE
);


CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nome_usuario` varchar(45) NOT NULL,
  `email_usuario` varchar(45) NOT NULL,
  `senha_usuario` varchar(60) NOT NULL,
  `admin_usuario` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
