-- ========================================
-- SCRIPT COMPLETO E ATUALIZADO - FIGURAMA
-- Data: 01/02/2026
-- ========================================

-- 1. Criação do Banco e Usuário
CREATE DATABASE IF NOT EXISTS figurama_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE figurama_db;

CREATE USER IF NOT EXISTS 'figurama'@'localhost' IDENTIFIED BY 'figurama123';
GRANT ALL PRIVILEGES ON figurama_db.* TO 'figurama'@'localhost';
FLUSH PRIVILEGES;

-- ========================================
-- 2. TABELA DE USUÁRIOS
-- ========================================
CREATE TABLE usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,  -- No Java: nomeUsuario
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,        -- No Java: senha
    data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ultimo_acesso DATETIME,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    
    INDEX idx_username (username),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 3. TABELA DE COLEÇÕES
-- ========================================
CREATE TABLE colecoes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,            -- No Java: titulo
    descricao VARCHAR(500),
    colecionador_id BIGINT NOT NULL,
    
    -- Datas com precisão de milissegundos para o Hibernate @UpdateTimestamp
    data_criacao DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    data_atualizacao DATETIME(6),
    
    -- OBS: A coluna 'quantidade' foi removida pois agora é calculada via @Formula no Java
    
    FOREIGN KEY (colecionador_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    INDEX idx_colecionador (colecionador_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 4. TABELA DE ACTION FIGURES (CATÁLOGO E COLEÇÃO)
-- ========================================
CREATE TABLE catalogo_action_figures (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(1000),
    categoria VARCHAR(50) NOT NULL DEFAULT 'Geral', -- Obrigatório no Java agora
    url_foto VARCHAR(500) NOT NULL,
    franquia VARCHAR(100),
    ano_lancamento VARCHAR(50),
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    
    -- Nova coluna para vincular diretamente à coleção
    -- NULL = Item do Catálogo Global (Modelo)
    -- PREENCHIDO = Item pertencente à coleção de um usuário
    colecao_id BIGINT NULL,
    
    FOREIGN KEY (colecao_id) REFERENCES colecoes(id) ON DELETE CASCADE,
    
    INDEX idx_categoria (categoria),
    INDEX idx_franquia (franquia),
    INDEX idx_nome (nome),
    INDEX idx_colecao (colecao_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- A tabela 'itens_colecao' foi removida pois agora a relação é direta (1:N)

-- ========================================
-- 5. CARGA INICIAL (SEED)
-- ========================================

-- Inserindo itens no CATÁLOGO GLOBAL (colecao_id fica NULL)
INSERT INTO catalogo_action_figures 
(nome, descricao, categoria, url_foto, franquia, ano_lancamento, ativo) 
VALUES 
('Jean Grey', 'Figura da poderosa telepata Jean Grey com visual da série animada X-Men 97.', 'Marvel', '/uploads/JeanGrey-X-men-97.jpg', 'X-Men 97', '2024', TRUE),
('Magneto', 'O mestre do magnetismo com seu novo traje do X-Men 97.', 'Marvel', '/uploads/Magneto-X-men-97.jpg', 'X-Men 97', '2024', TRUE),
('Fera', 'Dr. Hank McCoy, o Fera, em sua versão clássica de laboratório.', 'Marvel', '/uploads/Fera-X-men-97.jpg', 'X-Men 97', '2024', TRUE),
('Vampira', 'A intocável Vampira (Rogue) com jaqueta de couro.', 'Marvel', '/uploads/Vampira-X-men-97.jpg', 'X-Men 97', '2024', TRUE),
('Tempestade', 'Ororo Munroe, a Tempestade, com seu visual moicano punk.', 'Marvel', '/uploads/Tempestade-X-men-97.jpg', 'X-Men 97', '2024', TRUE),
('Wolverine', 'Logan com seu clássico uniforme amarelo e azul e garras de adamantium.', 'Marvel', '/uploads/Wolverine-X-men-97.jpg', 'X-Men 97', '2024', TRUE);

-- ========================================
-- 6. CONSULTAS DE TESTE (QUERIES)
-- ========================================

-- Listar todos os usuarios
SELECT id, username, email, ativo, data_criacao 
FROM usuarios;

-- Listar todas as coleções
SELECT id, nome AS 'titulo', descricao, colecionador_id 
FROM colecoes;

-- Listar todas as action figures
SELECT id, nome, franquia, categoria, colecao_id 
FROM catalogo_action_figures;

-- Listar coleções de um usuário específico mostrando o nome dele
SELECT 
    c.id AS 'ID Coleção',
    c.nome AS 'Nome da Coleção',
    c.descricao,
    u.username AS 'Dono da Coleção'
FROM 
    colecoes c
INNER JOIN 
    usuarios u ON c.colecionador_id = u.id
WHERE 
    u.id = 5;
    
-- Listar Action Figures de uma coleção específica mostrando o nome da coleção
SELECT 
    af.id AS 'ID Figura',
    af.nome AS 'Nome do Boneco',
    af.franquia,
    c.nome AS 'Pertence à Coleção'
FROM 
    catalogo_action_figures af
INNER JOIN 
    colecoes c ON af.colecao_id = c.id
WHERE 
    c.id = 1;
    
-- Diferenciar "Molde de Catálogo" vs "Item de Usuário"
SELECT 
    id, 
    nome, 
    CASE 
        WHEN colecao_id IS NULL THEN 'CATÁLOGO GLOBAL (MOLDE)'
        ELSE 'ITEM DE USUÁRIO'
    END AS 'Tipo de Registro'
FROM 
    catalogo_action_figures;
    
-- Contar quantas figuras existem em cada coleção
SELECT 
    c.nome AS 'Nome da Coleção',
    COUNT(af.id) AS 'Total de Figuras'
FROM 
    colecoes c
LEFT JOIN 
    catalogo_action_figures af ON c.id = af.colecao_id
GROUP BY 
    c.id, c.nome;

-- Ver Action Figures de uma coleção específica com detalhes da coleção
SELECT 
     af.id, af.nome, af.franquia, c.nome as nome_colecao 
 FROM 
     catalogo_action_figures af
 JOIN 
     colecoes c ON af.colecao_id = c.id
 WHERE 
     c.id = 1;