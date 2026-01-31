// ============================================
// SCRIPT.JS - LANDING PAGE INTEGRADA
// ============================================

document.addEventListener("DOMContentLoaded", async () => {

    // ==========================
    // CARREGAR NOVIDADES DO BACKEND
    // ==========================
    const gridNovidades = document.getElementById("novidadesGrid");
    
    if (gridNovidades) {
        try {
            const novidades = await CatalogoAPI.listarTodas();
            const ultimasNovidades = novidades.slice(0, 5); // Pegar 5 mais recentes
            
            gridNovidades.innerHTML = ''; // Limpar placeholders
            
            ultimasNovidades.forEach((figura, index) => {
                const card = document.createElement("div");
                card.className = "card";
                card.style.animationDelay = `${index * 0.1}s`;
                
                // Estrutura do card
                card.innerHTML = `
                    <img src="${figura.urlFoto || 'images/placeholder.png'}" 
                         alt="${figura.nome}"
                         style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;">
                    <h3 style="margin-top: 10px; font-size: 14px;">${figura.nome}</h3>
                    <p style="font-size: 12px; opacity: 0.7;">${figura.categoria}</p>
                    <p style="font-size: 13px; margin-top: 5px; color: #c77dff;">
                        ${figura.precoSugerido ? `R$ ${figura.precoSugerido.toFixed(2)}` : 'Consultar'}
                    </p>
                `;
                
                // Adicionar evento de clique
                card.addEventListener("click", () => {
                    window.location.href = `pages/action_figure.html?id=${figura.id}`;
                });
                
                gridNovidades.appendChild(card);
            });
            
        } catch (error) {
            console.error('Erro ao carregar novidades:', error);
            gridNovidades.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Erro ao carregar novidades</p>';
        }
    }

    // ==========================
    // CARREGAR POPULARES DO BACKEND
    // ==========================
    const gridPopular = document.getElementById("popularGrid");
    
    if (gridPopular) {
        try {
            // Buscar figuras Marvel (populares)
            const populares = await CatalogoAPI.buscarPorCategoria('Marvel');
            const top5 = populares.slice(0, 5);
            
            gridPopular.innerHTML = '';
            
            top5.forEach((figura, index) => {
                const card = document.createElement("div");
                card.className = "card";
                card.style.animationDelay = `${index * 0.1}s`;
                
                card.innerHTML = `
                    <img src="${figura.urlFoto || 'images/placeholder.png'}" 
                         alt="${figura.nome}"
                         style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;">
                    <h3 style="margin-top: 10px; font-size: 14px;">${figura.nome}</h3>
                    <p style="font-size: 12px; opacity: 0.7;">${figura.categoria}</p>
                    <p style="font-size: 13px; margin-top: 5px; color: #c77dff;">
                        ${figura.precoSugerido ? `R$ ${figura.precoSugerido.toFixed(2)}` : 'Consultar'}
                    </p>
                `;
                
                card.addEventListener("click", () => {
                    window.location.href = `pages/action_figure.html?id=${figura.id}`;
                });
                
                gridPopular.appendChild(card);
            });
            
        } catch (error) {
            console.error('Erro ao carregar populares:', error);
            gridPopular.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Erro ao carregar populares</p>';
        }
    }

    // ==========================
    // NAVEGAÇÃO
    // ==========================
    const exploreBtn = document.getElementById("exploreBtn");
    if (exploreBtn) {
        exploreBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const novidades = document.querySelector(".novidades");
            if (novidades) {
                novidades.scrollIntoView({ behavior: "smooth" });
            }
        });
    }

    const startBtn = document.getElementById("startBtn");
    if (startBtn) {
        startBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = 'pages/register.html';
        });
    }

    // ==========================
    // PESQUISA
    // ==========================
    const searchInput = document.querySelector(".search-box input");
    if (searchInput) {
        searchInput.addEventListener("keypress", async (e) => {
            if (e.key === "Enter") {
                const termo = e.target.value.trim();
                if (termo) {
                    try {
                        const resultados = await CatalogoAPI.pesquisar(termo);
                        
                        if (resultados.length > 0) {
                            // Redirecionar para página de resultados (criar depois)
                            window.location.href = `pages/pesquisa.html?q=${encodeURIComponent(termo)}`;
                        } else {
                            alert('Nenhuma action figure encontrada com esse nome');
                        }
                    } catch (error) {
                        console.error('Erro na pesquisa:', error);
                        alert('Erro ao realizar pesquisa');
                    }
                }
            }
        });
    }
});
