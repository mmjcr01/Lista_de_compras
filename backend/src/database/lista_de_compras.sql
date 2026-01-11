CREATE TABLE `categorias` (
  `categoria_id` varchar(36) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `descricao` text,
  `icone` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`categoria_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `config_usuario` (
  `config_usuario_id` varchar(36) NOT NULL,
  `usuario_id` varchar(36) NOT NULL,
  `tema` enum('claro','escuro') DEFAULT 'claro',
  `utilizar_localizacao` tinyint(1) DEFAULT '1',
  `estado_preferido` varchar(2) DEFAULT NULL,
  `cidade_preferida` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`config_usuario_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `config_usuario_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `estabelecimentos` (
  `estabelecimento_id` varchar(36) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `tipo_logradouro` varchar(50) DEFAULT NULL,
  `logradouro` varchar(255) NOT NULL,
  `numero` varchar(20) DEFAULT NULL,
  `bairro` varchar(100) NOT NULL,
  `cidade` varchar(100) NOT NULL,
  `estado` varchar(2) NOT NULL,
  `cep` varchar(9) DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `ativo` tinyint(1) DEFAULT '1',
  `validado` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`estabelecimento_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `favoritos` (
  `favoritos_id` varchar(36) NOT NULL,
  `usuario_id` varchar(36) NOT NULL,
  `produto_id` varchar(36) DEFAULT NULL,
  `estabelecimento_id` varchar(36) DEFAULT NULL,
  `tipo` enum('produto','estabelecimento') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`favoritos_id`),
  UNIQUE KEY `unique_favorito` (`usuario_id`,`produto_id`,`estabelecimento_id`),
  KEY `produto_id` (`produto_id`),
  KEY `estabelecimento_id` (`estabelecimento_id`),
  CONSTRAINT `favoritos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`) ON DELETE CASCADE,
  CONSTRAINT `favoritos_ibfk_2` FOREIGN KEY (`produto_id`) REFERENCES `produtos` (`produto_id`),
  CONSTRAINT `favoritos_ibfk_3` FOREIGN KEY (`estabelecimento_id`) REFERENCES `estabelecimentos` (`estabelecimento_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `historico_buscas` (
  `historico_buscas_id` varchar(36) NOT NULL,
  `usuario_id` varchar(36) NOT NULL,
  `termo_busca` varchar(255) NOT NULL,
  `tipo_busca` enum('produto','codigo_barras') NOT NULL,
  `resultados_encontrados` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`historico_buscas_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `historico_buscas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `itens_lista` (
  `item_lista_id` varchar(36) NOT NULL,
  `lista_compras_id` varchar(36) NOT NULL,
  `produto_id` varchar(36) NOT NULL,
  `quantidade` decimal(8,3) NOT NULL,
  `unidade` varchar(20) NOT NULL,
  `preco_estimado` decimal(10,2) DEFAULT NULL,
  `comprado` tinyint(1) DEFAULT '0',
  `ordem` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`item_lista_id`),
  KEY `lista_compras_id` (`lista_compras_id`),
  KEY `produto_id` (`produto_id`),
  CONSTRAINT `itens_lista_ibfk_1` FOREIGN KEY (`lista_compras_id`) REFERENCES `listas_compras` (`lista_compras_id`) ON DELETE CASCADE,
  CONSTRAINT `itens_lista_ibfk_2` FOREIGN KEY (`produto_id`) REFERENCES `produtos` (`produto_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `listas_compras` (
  `lista_compras_id` varchar(36) NOT NULL,
  `usuario_id` varchar(36) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `orcamento_total` decimal(10,2) DEFAULT NULL,
  `data_criacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ativa` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`lista_compras_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `listas_compras_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `precos` (
  `preco_id` varchar(36) NOT NULL,
  `produto_id` varchar(36) NOT NULL,
  `estabelecimento_id` varchar(36) NOT NULL,
  `usuario_id` varchar(36) NOT NULL,
  `preco` decimal(10,2) NOT NULL,
  `data_coleta` timestamp NOT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `validado` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`preco_id`),
  KEY `produto_id` (`produto_id`),
  KEY `estabelecimento_id` (`estabelecimento_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `precos_ibfk_1` FOREIGN KEY (`produto_id`) REFERENCES `produtos` (`produto_id`),
  CONSTRAINT `precos_ibfk_2` FOREIGN KEY (`estabelecimento_id`) REFERENCES `estabelecimentos` (`estabelecimento_id`),
  CONSTRAINT `precos_ibfk_3` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `produtos` (
  `produto_id` varchar(36) NOT NULL,
  `ean` varchar(13) DEFAULT NULL,
  `nome` varchar(255) NOT NULL,
  `nome_normalizado` varchar(255) NOT NULL,
  `descricao` text,
  `unidade` varchar(50) NOT NULL,
  `categoria_id` varchar(36) DEFAULT NULL,
  `imagem_url` text,
  `ativo` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`produto_id`),
  UNIQUE KEY `ean` (`ean`),
  KEY `categoria_id` (`categoria_id`),
  CONSTRAINT `produtos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`categoria_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `usuarios` (
  `usuario_id` varchar(36) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha_hash` varchar(255) DEFAULT NULL,
  `nome` varchar(100) NOT NULL,
  `estado` varchar(2) NOT NULL,
  `cidade` varchar(100) NOT NULL,
  `foto_url` text,
  `google_id` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`usuario_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `google_id` (`google_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
