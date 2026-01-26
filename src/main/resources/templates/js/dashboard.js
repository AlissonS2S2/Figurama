// ============================================
// DASHBOARD.JS - DASHBOARD DO USUÁRIO
// ============================================

// Simular ID do usuário logado (após implementar autenticação)
const USUARIO_ID = 1;
const USUARIO_NOME = "Jardel Alves";

document.addEventListener("DOMContentLoaded", async () => {

    // ==========================
    // CARREGAR DADOS DO USUÁRIO
    // ==========================
    
    // Atualizar nome do usuário
    const nomeUsuario = document.querySelector('.nome-usuario');
    if (nomeUsuario) {
        nomeUsuario.textContent = USUARIO_NOME;
    }
    
    // Atualizar mensagem de boas-vindas
    const welcomeMsg = document.querySelector('.wb');
    if (welcomeMsg) {
        welcomeMsg.textContent = `Bem-vindo de volta ${USUARIO_NOME}, suas coleções te esperam...`;
    }

    // ==========================
    // CARREGAR ESTATÍSTICAS
    // ==========================
    
    try {
        // Buscar todas as coleções do usuário
        const colecoes = await ColecaoAPI.listarTodas();
        const colecoesUsuario = colecoes.filter(c => c.colecionadorId === USUARIO_ID);
        
        // Calcular total de figures
        let totalFigures = 0;
        for (const colecao of colecoesUsuario) {
            const total = await ItemColecaoAPI.contar(colecao.id);
            totalFigures += total;
        }
        
        // Atualizar estatísticas
        const stats = document.querySelectorAll('.stat');
        if (stats.length >= 2) {
            stats[0].innerHTML = `${totalFigures} <span>Figuras salvas</span>`;
            stats[1].innerHTML = `${colecoesUsuario.length} <span>Coleções criadas</span>`;
        }
        
        // ==========================
        // ÚLTIMAS ADICIONADAS
        // ==========================
        
        const recentGrid = document.querySelector('.recent-grid');
        if (recentGrid && colecoesUsuario.length > 0) {
            recentGrid.innerHTML = '';
            
            // Pegar itens da primeira coleção (últimos 3)
            const primeiraColecao = colecoesUsuario[0];
            const itens = await ItemColecaoAPI.listarItens(primeiraColecao.id);
            const ultimos3 = itens.slice(-3);
            
            ultimos3.forEach(item => {
                const card = document.createElement('div');
                card.className = 'recent-card';
                card.style.backgroundImage = `url(${item.actionFigure.urlFoto})`;
                card.style.backgroundSize = 'cover';
                card.style.backgroundPosition = 'center';
                card.style.cursor = 'pointer';
                
                card.addEventListener('click', () => {
                    window.location.href = `action_figure.html?id=${item.actionFigure.id}`;
                });
                
                recentGrid.appendChild(card);
            });
        }
        
        // ==========================
        // RENDERIZAR COLEÇÕES
        // ==========================
        
        const collectionsContainer = document.querySelector('.collections');
        if (collectionsContainer) {
            collectionsContainer.innerHTML = '';
            
            for (const colecao of colecoesUsuario) {
                const total = await ItemColecaoAPI.contar(colecao.id);
                
                const card = document.createElement('div');
                card.className = 'collection-card';
                card.innerHTML = `
                    <p>${colecao.nome}</p>
                    <small>${total} Figures</small>
                `;
                
                card.style.cursor = 'pointer';
                card.addEventListener('click', () => {
                    window.location.href = `minha_colecao.html?id=${colecao.id}`;
                });
                
                collectionsContainer.appendChild(card);
            }
            
            // Adicionar botão de criar nova coleção
            const addCard = document.createElement('div');
            addCard.className = 'collection-card';
            addCard.style.border = '2px dashed #c77dff';
            addCard.style.cursor = 'pointer';
            addCard.innerHTML = `
                <p style="font-size: 24px;">+</p>
                <small>Nova Coleção</small>
            `;
            
            addCard.addEventListener('click', () => {
                window.location.href = 'criando_colecao.html';
            });
            
            collectionsContainer.appendChild(addCard);
        }
        
    } catch (error) {
        console.error('Erro ao carregar dashboard:', error);
    }

    // ==========================
    // NOVIDADES (CATÁLOGO)
    // ==========================
    
    const newsGrid = document.querySelector('.news-grid');
    if (newsGrid) {
        try {
            const novidades = await CatalogoAPI.listarTodas();
            const ultimas3 = novidades.slice(0, 3);
            
            newsGrid.innerHTML = '';
            
            ultimas3.forEach(figura => {
                const card = document.createElement('div');
                card.className = 'news-card';
                
                const img = document.createElement('img');
                img.src = figura.urlFoto || 'images/placeholder.png';
                img.alt = figura.nome;
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                img.style.cursor = 'pointer';
                
                img.addEventListener('click', () => {
                    window.location.href = `action_figure.html?id=${figura.id}`;
                });
                
                card.appendChild(img);
                newsGrid.appendChild(card);
            });
            
        } catch (error) {
            console.error('Erro ao carregar novidades:', error);
        }
    }

    // ==========================
    // BOTÃO ADICIONAR
    // ==========================
    
    const btnAdd = document.querySelector('.btn-add');
    if (btnAdd) {
        btnAdd.addEventListener('click', () => {
            window.location.href = 'criando_colecao.html';
        });
    }

    // ==========================
    // PESQUISA
    // ==========================
    
    const searchInput = document.querySelector('.nav-logged input[type="text"]');
    if (searchInput) {
        searchInput.addEventListener('keypress', async (e) => {
            if (e.key === 'Enter') {
                const termo = e.target.value.trim();
                if (termo) {
                    try {
                        const resultados = await CatalogoAPI.pesquisar(termo);
                        console.log('Resultados:', resultados);
                        // Implementar página de resultados
                    } catch (error) {
                        console.error('Erro na pesquisa:', error);
                    }
                }
            }
        });
    }
});