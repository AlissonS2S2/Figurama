-- Dados iniciais para o Figurama (H2 Database)
-- Inserindo usuários de exemplo
INSERT INTO usuarios (nome_usuario, email, senha) VALUES 
('admin', 'admin@figurama.com', 'admin123'),
('joao', 'joao@figurama.com', 'joao123'),
('maria', 'maria@figurama.com', 'maria123');

-- Inserindo coleções de exemplo
INSERT INTO colecoes (nome, descricao, colecionador_id) VALUES 
('Marvel Heroes', 'Coleção de heróis da Marvel', 1),
('DC Comics', 'Personagens do universo DC', 2),
('Anime Figures', 'Figuras de anime', 3);

-- Inserindo action figures de exemplo
INSERT INTO catalogo_action_figures (nome, descricao, categoria, url_foto, franquia, ano_lancamento, ativo, colecao_id) VALUES 
('Homem de Ferro', 'Homem de Ferro com armadura Mark 85', 'Ação', 'https://via.placeholder.com/250/ff0000/ffffff?text=Iron+Man', 'Marvel', '2019', true, 1),
('Capitão América', 'Capitão América com escudo', 'Ação', 'https://via.placeholder.com/250/0000ff/ffffff?text=Cap+America', 'Marvel', '2019', true, 1),
('Hulk', 'Hulk Smash versão raivosa', 'Ação', 'https://via.placeholder.com/250/00ff00/ffffff?text=Hulk', 'Marvel', '2019', true, 1),
('Batman', 'Batman com capa e máscara', 'Ação', 'https://via.placeholder.com/250/000000/ffffff?text=Batman', 'DC Comics', '2020', true, 2),
('Superman', 'Superman voando', 'Ação', 'https://via.placeholder.com/250/ff0000/0000ff?text=Superman', 'DC Comics', '2020', true, 2),
('Mulher-Maravilha', 'Mulher-Maravilha com laço', 'Ação', 'https://via.placeholder.com/250/ff0000/0000ff?text=Wonder+Woman', 'DC Comics', '2020', true, 2),
('Goku', 'Goku Super Saiyajin', 'Anime', 'https://via.placeholder.com/250/ff8800/000000?text=Goku', 'Dragon Ball', '2021', true, 3),
('Naruto', 'Naruto Uzumaki', 'Anime', 'https://via.placeholder.com/250/ff8800/000000?text=Naruto', 'Naruto', '2021', true, 3),
('Luffy', 'Monkey D. Luffy', 'Anime', 'https://via.placeholder.com/250/ff8800/000000?text=Luffy', 'One Piece', '2021', true, 3),
('Spider-Man', 'Homem-Aranha com teia', 'Ação', 'https://via.placeholder.com/250/ff0000/ffffff?text=Spider-Man', 'Marvel', '2021', true, NULL),
('Thor', 'Thor com martelo', 'Ação', 'https://via.placeholder.com/250/ff0000/ffffff?text=Thor', 'Marvel', '2021', true, NULL),
('Flash', 'Flash com raio', 'Ação', 'https://via.placeholder.com/250/ff0000/ffffff?text=Flash', 'DC Comics', '2021', true, NULL);
