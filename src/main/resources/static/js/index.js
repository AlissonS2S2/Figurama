// index.js - Página principal com catálogo de action figures

class CatalogManager {
    constructor() {
        this.figures = [];
        this.init();
    }

    async init() {
        await this.loadCatalog();
        this.setupEventListeners();
    }

    async loadCatalog() {
        try {
            const response = await fetch('/action-figures/listar');
            if (!response.ok) throw new Error('Erro ao carregar catálogo');
            
            this.figures = await response.json();
            this.renderCatalog();
        } catch (error) {
            console.error('Erro:', error);
            this.showError('Falha ao carregar o catálogo. Tente novamente mais tarde.');
        }
    }

    renderCatalog() {
        const grid = document.getElementById('catalog-grid');
        if (!grid) return;

        if (this.figures.length === 0) {
            grid.innerHTML = '<p class="no-items">Nenhuma figura encontrada no catálogo.</p>';
            return;
        }

        grid.innerHTML = this.figures.map(figure => `
            <div class="card">
                <img src="${figure.urlFoto || 'https://via.placeholder.com/250'}" 
                     alt="${figure.nome}" 
                     onerror="this.src='https://via.placeholder.com/250/cccccc/666666?text=Sem+Imagem'">
                <div class="card-body">
                    <h3>${figure.nome}</h3>
                    <p class="franquia">${figure.franquia || 'Sem franquia'}</p>
                    <p class="categoria">${figure.categoria || 'Geral'}</p>
                    <a href="/detalhes?id=${figure.id}" class="btn">Ver Detalhes</a>
                </div>
            </div>
        `).join('');
    }

    setupEventListeners() {
        // Busca em tempo real
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterFigures(e.target.value);
            });
        }

        // Filtro por categoria
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.filterByCategory(e.target.value);
            });
        }
    }

    filterFigures(searchTerm) {
        const filtered = this.figures.filter(figure => 
            figure.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            figure.franquia.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.renderFilteredCatalog(filtered);
    }

    filterByCategory(category) {
        const filtered = category === 'all' 
            ? this.figures 
            : this.figures.filter(figure => figure.categoria === category);
        this.renderFilteredCatalog(filtered);
    }

    renderFilteredCatalog(figures) {
        const grid = document.getElementById('catalog-grid');
        if (!grid) return;

        if (figures.length === 0) {
            grid.innerHTML = '<p class="no-items">Nenhuma figura encontrada com os filtros selecionados.</p>';
            return;
        }

        grid.innerHTML = figures.map(figure => `
            <div class="card">
                <img src="${figure.urlFoto || 'https://via.placeholder.com/250'}" 
                     alt="${figure.nome}" 
                     onerror="this.src='https://via.placeholder.com/250/cccccc/666666?text=Sem+Imagem'">
                <div class="card-body">
                    <h3>${figure.nome}</h3>
                    <p class="franquia">${figure.franquia || 'Sem franquia'}</p>
                    <p class="categoria">${figure.categoria || 'Geral'}</p>
                    <a href="/detalhes?id=${figure.id}" class="btn">Ver Detalhes</a>
                </div>
            </div>
        `).join('');
    }

    showError(message) {
        const grid = document.getElementById('catalog-grid');
        if (grid) {
            grid.innerHTML = `<div class="error-message">${message}</div>`;
        }
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new CatalogManager();
});

// Função global para carregar novidades
async function loadNovidades() {
    try {
        const response = await fetch('/action-figures/novidades');
        if (!response.ok) throw new Error('Erro ao carregar novidades');
        
        const novidades = await response.json();
        const novidadesGrid = document.getElementById('novidades-grid');
        
        if (novidadesGrid) {
            novidadesGrid.innerHTML = novidades.map(figure => `
                <div class="card featured">
                    <img src="${figure.urlFoto || 'https://via.placeholder.com/250'}" 
                         alt="${figure.nome}" 
                         onerror="this.src='https://via.placeholder.com/250/cccccc/666666?text=Sem+Imagem'">
                    <div class="card-body">
                        <h3>${figure.nome}</h3>
                        <p class="franquia">${figure.franquia || 'Sem franquia'}</p>
                        <span class="new-badge">NOVO</span>
                        <a href="/detalhes?id=${figure.id}" class="btn">Ver Detalhes</a>
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Erro ao carregar novidades:', error);
    }
}
