-- ========================================
-- SCRIPT COMPLETO DO BANCO DE DADOS FIGURAMA
-- Versão Atualizada com Usuários
-- Data: 25/01/2026
-- ========================================

-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS figurama_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE figurama_db;

-- Cria o usuário se ele não existir
CREATE USER IF NOT EXISTS 'figurama'@'localhost' IDENTIFIED BY 'figurama123';

-- Dá permissões totais para esse usuário no banco 'figurama_db'
GRANT ALL PRIVILEGES ON figurama_db.* TO 'figurama'@'localhost';

-- Aplica as mudanças
FLUSH PRIVILEGES;

-- ========================================
-- LIMPAR ESTRUTURA ANTIGA
-- ========================================

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS itens_colecao;
DROP TABLE IF EXISTS colecoes;
DROP TABLE IF EXISTS catalogo_action_figures;
DROP TABLE IF EXISTS usuarios;

SET FOREIGN_KEY_CHECKS = 1;

-- ========================================
-- TABELA DE USUÁRIOS
-- ========================================

CREATE TABLE usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ultimo_acesso DATETIME,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_ativo (ativo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- TABELA DE COLEÇÕES
-- ========================================

CREATE TABLE colecoes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(500),
    colecionador_id BIGINT NOT NULL,
    data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao DATETIME,
    
    FOREIGN KEY (colecionador_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    
    INDEX idx_colecionador (colecionador_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- TABELA DE CATÁLOGO
-- ========================================

CREATE TABLE catalogo_action_figures (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(1000),
    categoria VARCHAR(50) NOT NULL,
    url_foto VARCHAR(500) NOT NULL,
    franquia VARCHAR(100),
    ano_lancamento VARCHAR(50),
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    
    INDEX idx_categoria (categoria),
    INDEX idx_franquia (franquia),
    INDEX idx_ativo (ativo),
    INDEX idx_nome (nome)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- TABELA DE ITENS DA COLEÇÃO
-- ========================================

CREATE TABLE itens_colecao (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    catalogo_action_figure_id BIGINT NOT NULL,
    colecao_id BIGINT NOT NULL,
    data_adicao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (catalogo_action_figure_id) 
        REFERENCES catalogo_action_figures(id) 
        ON DELETE CASCADE,
    
    FOREIGN KEY (colecao_id) 
        REFERENCES colecoes(id) 
        ON DELETE CASCADE,
    
    UNIQUE KEY unique_item_colecao (colecao_id, catalogo_action_figure_id),
    
    INDEX idx_colecao (colecao_id),
    INDEX idx_action_figure (catalogo_action_figure_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- CONSULTAS ÚTEIS
-- ========================================

SELECT * FROM catalogo_action_figures;

-- Ver todos os usuários
SELECT id, username, email, ativo FROM usuarios;


-- Desativar verificação de chave estrangeira para permitir limpar tudo
SET FOREIGN_KEY_CHECKS = 0;

-- Limpar as tabelas (TRUNCATE apaga tudo e reseta o ID para 1)
TRUNCATE TABLE itens_colecao;
TRUNCATE TABLE colecoes;
TRUNCATE TABLE catalogo_action_figures;

-- Reativar verificação
SET FOREIGN_KEY_CHECKS = 1;

ALTER TABLE catalogo_action_figures ADD COLUMN franquia VARCHAR(100);

INSERT INTO catalogo_action_figures 
(nome, descricao, categoria, url_foto, franquia, ano_lancamento, ativo) 
VALUES 
('Jean Grey', 'Figura da poderosa telepata Jean Grey com visual da série animada X-Men 97.', 'Marvel', '/uploads/JeanGrey-X-men-97.jpg', 'X-Men 97', '2024', TRUE),

('Magneto', 'O mestre do magnetismo com seu novo traje do X-Men 97.', 'Marvel', '/uploads/Magneto-X-men-97.jpg', 'X-Men 97', '2024', TRUE),

('Fera', 'Dr. Hank McCoy, o Fera, em sua versão clássica de laboratório.', 'Marvel', '/uploads/Fera-X-men-97.jpg', 'X-Men 97', '2024', TRUE),

('Vampira', 'A intocável Vampira (Rogue) com jaqueta de couro.', 'Marvel', '/uploads/Vampira-X-men-97.jpg', 'X-Men 97', '2024', TRUE),

('Tempestade', 'Ororo Munroe, a Tempestade, com seu visual moicano punk.', 'Marvel', '/uploads/Tempestade-X-men-97.jpg', 'X-Men 97', '2024', TRUE),

('Wolverine', 'Logan com seu clássico uniforme amarelo e azul e garras de adamantium.', 'Marvel', '/uploads/Wolverine-X-men-97.jpg', 'X-Men 97', '2024', TRUE);