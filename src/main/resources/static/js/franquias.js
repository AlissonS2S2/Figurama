// franquias.js - Listagem e exploração de franquias

class FranchisesManager {
    constructor() {
        this.allFigures = [];
        this.franchises = [];
        this.selectedFranchise = null;
        this.init();
    }

    async init() {
        await this.loadAllFigures();
        this.extractFranchises();
        this.renderFranchises();
        this.setupEventListeners();
    }

    async loadAllFigures() {
        try {
            const response = await fetch('/action-figures/listar');
            if (!response.ok) throw new Error('Erro ao carregar figuras');
            
            this.allFigures = await response.json();
        } catch (error) {
            console.error('Erro:', error);
            this.showError('Falha ao carregar as figuras. Tente novamente mais tarde.');
        }
    }

    extractFranchises() {
        // Agrupar figuras por franquia
        const franchiseMap = new Map();
        
        this.allFigures.forEach(figure => {
            const franchise = figure.franquia || 'Sem franquia';
            
            if (!franchiseMap.has(franchise)) {
                franchiseMap.set(franchise, {
                    name: franchise,
                    figures: [],
                    count: 0,
                    categories: new Set()
                });
            }
            
            const franchiseData = franchiseMap.get(franchise);
            franchiseData.figures.push(figure);
            franchiseData.count++;
            
            if (figure.categoria) {
                franchiseData.categories.add(figure.categoria);
            }
        });

        // Converter para array e ordenar
        this.franchises = Array.from(franchiseMap.values())
            .map(franchise => ({
                ...franchise,
                categories: Array.from(franchise.categories)
            }))
            .sort((a, b) => a.name.localeCompare(b.name));
    }

    renderFranchises() {
        const container = document.getElementById('franchises-container');
        if (!container) return;

        if (this.franchises.length === 0) {
            container.innerHTML = '<p class="no-franchises">Nenhuma franquia encontrada.</p>';
            return;
        }

        container.innerHTML = this.franchises.map(franchise => `
            <div class="franchise-card" onclick="franquiasManager.selectFranchise('${franchise.name}')">
                <div class="franchise-header">
                    <h3>${franchise.name}</h3>
                    <span class="figure-count">${franchise.count} figuras</span>
                </div>
                
                <div class="franchise-preview">
                    ${this.renderFranchisePreview(franchise.figures)}
                </div>
                
                <div class="franchise-info">
                    <div class="categories">
                        ${franchise.categories.map(category => 
                            `<span class="category-tag">${category}</span>`
                        ).join('')}
                    </div>
                    <button class="btn btn-primary">Ver Franquia</button>
                </div>
            </div>
        `).join('');

        // Renderizar estatísticas
        this.renderStatistics();
    }

    renderFranchisePreview(figures) {
        const previewFigures = figures.slice(0, 3);
        return previewFigures.map(figure => `
            <img src="${figure.urlFoto || 'https://via.placeholder.com/100'}" 
                 alt="${figure.nome}" 
                 title="${figure.nome}"
                 onerror="this.src='https://via.placeholder.com/100/cccccc/666666?text=Sem+Imagem'">
        `).join('');
    }

    renderStatistics() {
        const statsContainer = document.getElementById('franchises-stats');
        if (!statsContainer) return;

        const totalFranchises = this.franchises.length;
        const totalFigures = this.allFigures.length;
        const avgFiguresPerFranchise = (totalFigures / totalFranchises).toFixed(1);

        statsContainer.innerHTML = `
            <div class="stat-card">
                <h3>${totalFranchises}</h3>
                <p>Franquias</p>
            </div>
            <div class="stat-card">
                <h3>${totalFigures}</h3>
                <p>Figuras Totais</p>
            </div>
            <div class="stat-card">
                <h3>${avgFiguresPerFranchise}</h3>
                <p>Média por Franquia</p>
            </div>
        `;
    }

    setupEventListeners() {
        // Busca de franquias
        const searchInput = document.getElementById('franchise-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterFranchises(e.target.value);
            });
        }

        // Ordenação
        const sortBy = document.getElementById('sort-franchises');
        if (sortBy) {
            sortBy.addEventListener('change', (e) => {
                this.sortFranchises(e.target.value);
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

    filterFranchises(searchTerm) {
        const filtered = this.franchises.filter(franchise => 
            franchise.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        this.renderFilteredFranchises(filtered);
    }

    sortFranchises(sortBy) {
        let sorted = [...this.franchises];
        
        switch (sortBy) {
            case 'name':
                sorted.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'count':
                sorted.sort((a, b) => b.count - a.count);
                break;
            case 'categories':
                sorted.sort((a, b) => b.categories.length - a.categories.length);
                break;
            default:
                break;
        }
        
        this.franchises = sorted;
        this.renderFranchises();
    }

    filterByCategory(category) {
        if (!category) {
            this.renderFranchises();
            return;
        }

        const filtered = this.franchises.filter(franchise => 
            franchise.categories.includes(category)
        );
        
        this.renderFilteredFranchises(filtered);
    }

    renderFilteredFranchises(franchises) {
        const container = document.getElementById('franchises-container');
        if (!container) return;

        if (franchises.length === 0) {
            container.innerHTML = '<p class="no-franchises">Nenhuma franquia encontrada com os filtros selecionados.</p>';
            return;
        }

        container.innerHTML = franchises.map(franchise => `
            <div class="franchise-card" onclick="franquiasManager.selectFranchise('${franchise.name}')">
                <div class="franchise-header">
                    <h3>${franchise.name}</h3>
                    <span class="figure-count">${franchise.count} figuras</span>
                </div>
                
                <div class="franchise-preview">
                    ${this.renderFranchisePreview(franchise.figures)}
                </div>
                
                <div class="franchise-info">
                    <div class="categories">
                        ${franchise.categories.map(category => 
                            `<span class="category-tag">${category}</span>`
                        ).join('')}
                    </div>
                    <button class="btn btn-primary">Ver Franquia</button>
                </div>
            </div>
        `).join('');
    }

    async selectFranchise(franchiseName) {
        this.selectedFranchise = franchiseName;
        
        try {
            const response = await fetch(`/action-figures/buscar-por-franquia?franquia=${encodeURIComponent(franchiseName)}`);
            if (!response.ok) throw new Error('Erro ao carregar figuras da franquia');
            
            const figures = await response.json();
            this.showFranchiseDetails(franchiseName, figures);
        } catch (error) {
            console.error('Erro:', error);
            this.showError('Falha ao carregar figuras da franquia. Tente novamente.');
        }
    }

    showFranchiseDetails(franchiseName, figures) {
        const modal = document.getElementById('franchise-modal');
        const modalContent = modal?.querySelector('.modal-content');
        
        if (!modal || !modalContent) {
            this.createFranchiseModal(franchiseName, figures);
            return;
        }

        const franchise = this.franchises.find(f => f.name === franchiseName);
        
        modalContent.innerHTML = `
            <div class="modal-header">
                <h2>${franchiseName}</h2>
                <span class="close" onclick="franquiasManager.closeModal()">&times;</span>
            </div>
            
            <div class="franchise-stats">
                <div class="stat">
                    <strong>${figures.length}</strong>
                    <span>Figuras</span>
                </div>
                <div class="stat">
                    <strong>${franchise?.categories.length || 0}</strong>
                    <span>Categorias</span>
                </div>
            </div>
            
            <div class="categories-section">
                <h4>Categorias</h4>
                <div class="categories-list">
                    ${franchise?.categories.map(category => 
                        `<span class="category-badge">${category}</span>`
                    ).join('') || '<p>Nenhuma categoria</p>'}
                </div>
            </div>
            
            <div class="figures-grid">
                ${figures.map(figure => `
                    <div class="figure-card">
                        <img src="${figure.urlFoto || 'https://via.placeholder.com/200'}" 
                             alt="${figure.nome}" 
                             onerror="this.src='https://via.placeholder.com/200/cccccc/666666?text=Sem+Imagem'">
                        <div class="figure-info">
                            <h4>${figure.nome}</h4>
                            <p class="category">${figure.categoria || 'Geral'}</p>
                            <p class="year">${figure.anoLancamento || 'Ano desconhecido'}</p>
                            <a href="/detalhes?id=${figure.id}" class="btn btn-small">Ver Detalhes</a>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="modal-actions">
                <button class="btn btn-secondary" onclick="franquiasManager.closeModal()">Fechar</button>
                <button class="btn btn-primary" onclick="franquiasManager.searchFranchise('${franchiseName}')">
                    Buscar na Página de Pesquisa
                </button>
            </div>
        `;
        
        modal.style.display = 'block';
    }

    searchFranchise(franchiseName) {
        // Redirecionar para página de pesquisa com a franquia selecionada
        window.location.href = `/pesquisa?franquia=${encodeURIComponent(franchiseName)}`;
    }

    closeModal() {
        const modal = document.getElementById('franchise-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    createFranchiseModal(franchiseName, figures) {
        // Implementar criação dinâmica do modal
        console.log('Criar modal para franquia:', franchiseName, figures);
    }

    showError(message) {
        const errorElement = document.getElementById('error-message');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
}

// Funções globais
function selectFranchise(franchiseName) {
    if (window.franquiasManager) {
        window.franquiasManager.selectFranchise(franchiseName);
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.franquiasManager = new FranchisesManager();
});
