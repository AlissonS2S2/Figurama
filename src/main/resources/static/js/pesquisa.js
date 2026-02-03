// pesquisa.js - Busca avançada de action figures

class SearchManager {
    constructor() {
        this.allFigures = [];
        this.filteredFigures = [];
        this.categories = [];
        this.franchises = [];
        this.init();
    }

    async init() {
        await this.loadAllFigures();
        this.extractCategoriesAndFranchises();
        this.setupEventListeners();
        this.populateFilters();
    }

    async loadAllFigures() {
        try {
            const response = await fetch('/action-figures/listar');
            if (!response.ok) throw new Error('Erro ao carregar figuras');
            
            this.allFigures = await response.json();
            this.filteredFigures = [...this.allFigures];
        } catch (error) {
            console.error('Erro:', error);
            this.showError('Falha ao carregar as figuras. Tente novamente mais tarde.');
        }
    }

    extractCategoriesAndFranchises() {
        // Extrair categorias únicas
        const categorySet = new Set();
        const franchiseSet = new Set();
        
        this.allFigures.forEach(figure => {
            if (figure.categoria) categorySet.add(figure.categoria);
            if (figure.franquia) franchiseSet.add(figure.franquia);
        });
        
        this.categories = Array.from(categorySet).sort();
        this.franchises = Array.from(franchiseSet).sort();
    }

    setupEventListeners() {
        // Busca em tempo real
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.performSearch();
            });
        }

        // Filtros
        const categoryFilter = document.getElementById('category-filter');
        const franchiseFilter = document.getElementById('franchise-filter');
        const sortBy = document.getElementById('sort-by');

        if (categoryFilter) {
            categoryFilter.addEventListener('change', () => this.performSearch());
        }

        if (franchiseFilter) {
            franchiseFilter.addEventListener('change', () => this.performSearch());
        }

        if (sortBy) {
            sortBy.addEventListener('change', () => this.performSearch());
        }

        // Botão de busca
        const searchBtn = document.getElementById('search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.performSearch());
        }

        // Limpar filtros
        const clearFiltersBtn = document.getElementById('clear-filters');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => this.clearFilters());
        }

        // Busca por termo específico (endpoint de busca)
        const searchForm = document.getElementById('search-form');
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.searchByTerm();
            });
        }
    }

    populateFilters() {
        // Preencher filtro de categorias
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            categoryFilter.innerHTML = '<option value="">Todas as categorias</option>' +
                this.categories.map(category => 
                    `<option value="${category}">${category}</option>`
                ).join('');
        }

        // Preencher filtro de franquias
        const franchiseFilter = document.getElementById('franchise-filter');
        if (franchiseFilter) {
            franchiseFilter.innerHTML = '<option value="">Todas as franquias</option>' +
                this.franchises.map(franchise => 
                    `<option value="${franchise}">${franchise}</option>`
                ).join('');
        }
    }

    async searchByTerm() {
        const searchInput = document.getElementById('search-input');
        const term = searchInput ? searchInput.value.trim() : '';
        
        if (!term) {
            this.filteredFigures = [...this.allFigures];
            this.renderResults();
            return;
        }

        try {
            // Usar endpoint de busca do back-end
            const response = await fetch(`/action-figures/buscar?termo=${encodeURIComponent(term)}`);
            if (!response.ok) throw new Error('Erro na busca');
            
            this.filteredFigures = await response.json();
            this.renderResults();
            this.updateSearchStats(term);
        } catch (error) {
            console.error('Erro na busca:', error);
            // Fallback para busca local
            this.performSearch();
        }
    }

    performSearch() {
        const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';
        const selectedCategory = document.getElementById('category-filter')?.value || '';
        const selectedFranchise = document.getElementById('franchise-filter')?.value || '';
        const sortBy = document.getElementById('sort-by')?.value || 'name';

        // Filtrar figuras
        this.filteredFigures = this.allFigures.filter(figure => {
            const matchesSearch = !searchTerm || 
                figure.nome.toLowerCase().includes(searchTerm) ||
                figure.descricao.toLowerCase().includes(searchTerm) ||
                (figure.franquia && figure.franquia.toLowerCase().includes(searchTerm));

            const matchesCategory = !selectedCategory || figure.categoria === selectedCategory;
            const matchesFranchise = !selectedFranchise || figure.franquia === selectedFranchise;

            return matchesSearch && matchesCategory && matchesFranchise;
        });

        // Ordenar resultados
        this.sortResults(sortBy);

        // Renderizar resultados
        this.renderResults();
        this.updateSearchStats(searchTerm);
    }

    sortResults(sortBy) {
        switch (sortBy) {
            case 'name':
                this.filteredFigures.sort((a, b) => a.nome.localeCompare(b.nome));
                break;
            case 'franchise':
                this.filteredFigures.sort((a, b) => (a.franquia || '').localeCompare(b.franquia || ''));
                break;
            case 'category':
                this.filteredFigures.sort((a, b) => (a.categoria || '').localeCompare(b.categoria || ''));
                break;
            case 'year':
                this.filteredFigures.sort((a, b) => (b.anoLancamento || '').localeCompare(a.anoLancamento || ''));
                break;
            default:
                break;
        }
    }

    renderResults() {
        const resultsContainer = document.getElementById('search-results');
        const resultsCount = document.getElementById('results-count');
        
        if (!resultsContainer) return;

        // Atualizar contador
        if (resultsCount) {
            resultsCount.textContent = `${this.filteredFigures.length} resultado(s) encontrado(s)`;
        }

        if (this.filteredFigures.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <h3>Nenhuma figura encontrada</h3>
                    <p>Tente usar termos diferentes ou limpar os filtros.</p>
                    <button class="btn btn-secondary" onclick="searchManager.clearFilters()">Limpar Filtros</button>
                </div>
            `;
            return;
        }

        resultsContainer.innerHTML = this.filteredFigures.map(figure => `
            <div class="result-card">
                <img src="${figure.urlFoto || 'https://via.placeholder.com/200'}" 
                     alt="${figure.nome}" 
                     onerror="this.src='https://via.placeholder.com/200/cccccc/666666?text=Sem+Imagem'">
                <div class="result-info">
                    <h3>${figure.nome}</h3>
                    <p class="franchise">${figure.franquia || 'Sem franquia'}</p>
                    <p class="category">${figure.categoria || 'Geral'}</p>
                    <p class="year">${figure.anoLancamento || 'Ano desconhecido'}</p>
                    <p class="description">${figure.descricao || 'Sem descrição disponível'}</p>
                    <div class="result-actions">
                        <a href="/detalhes?id=${figure.id}" class="btn btn-primary">Ver Detalhes</a>
                        <button class="btn btn-secondary" onclick="searchManager.addToCollection(${figure.id})">
                            Adicionar à Coleção
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    updateSearchStats(searchTerm) {
        const statsContainer = document.getElementById('search-stats');
        if (!statsContainer) return;

        const totalFigures = this.allFigures.length;
        const filteredCount = this.filteredFigures.length;
        const percentage = totalFigures > 0 ? ((filteredCount / totalFigures) * 100).toFixed(1) : 0;

        statsContainer.innerHTML = `
            <div class="search-stats">
                <span>${filteredCount} de ${totalFigures} figuras (${percentage}%)</span>
                ${searchTerm ? `<span>para: "<strong>${searchTerm}</strong>"</span>` : ''}
            </div>
        `;
    }

    clearFilters() {
        // Limpar todos os campos
        const searchInput = document.getElementById('search-input');
        const categoryFilter = document.getElementById('category-filter');
        const franchiseFilter = document.getElementById('franchise-filter');
        const sortBy = document.getElementById('sort-by');

        if (searchInput) searchInput.value = '';
        if (categoryFilter) categoryFilter.value = '';
        if (franchiseFilter) franchiseFilter.value = '';
        if (sortBy) sortBy.value = 'name';

        // Resetar resultados
        this.filteredFigures = [...this.allFigures];
        this.renderResults();
        
        // Limpar estatísticas
        const statsContainer = document.getElementById('search-stats');
        if (statsContainer) statsContainer.innerHTML = '';
    }

    async addToCollection(figureId) {
        // Verificar se usuário está logado
        if (!requireAuth()) return;

        // Obter coleções do usuário
        try {
            const response = await fetch('/colecoes/listar');
            if (!response.ok) throw new Error('Erro ao carregar coleções');
            
            const collections = await response.json();
            const userCollections = collections.filter(c => c.colecionadorId === getCurrentUser().id);
            
            if (userCollections.length === 0) {
                alert('Você precisa criar uma coleção primeiro!');
                return;
            }

            // Mostrar modal para selecionar coleção
            this.showCollectionSelector(figureId, userCollections);
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao carregar suas coleções. Tente novamente.');
        }
    }

    showCollectionSelector(figureId, collections) {
        const modal = document.getElementById('collection-modal');
        const modalContent = modal?.querySelector('.modal-content');
        
        if (!modal || !modalContent) {
            // Criar modal dinamicamente se não existir
            this.createCollectionModal(figureId, collections);
            return;
        }

        modalContent.innerHTML = `
            <h3>Adicionar à Coleção</h3>
            <p>Selecione a coleção onde deseja adicionar esta figura:</p>
            <div class="collection-list">
                ${collections.map(collection => `
                    <div class="collection-option">
                        <input type="radio" name="collection" value="${collection.id}" id="collection-${collection.id}">
                        <label for="collection-${collection.id}">
                            <strong>${collection.nome}</strong>
                            <br><small>${collection.descricao || 'Sem descrição'}</small>
                        </label>
                    </div>
                `).join('')}
            </div>
            <div class="modal-actions">
                <button class="btn btn-secondary" onclick="searchManager.closeModal()">Cancelar</button>
                <button class="btn btn-primary" onclick="searchManager.confirmAddToCollection(${figureId})">Adicionar</button>
            </div>
        `;
        
        modal.style.display = 'block';
    }

    createCollectionModal(figureId, collections) {
        // Implementar criação dinâmica do modal
        console.log('Criar modal para adicionar figura:', figureId, collections);
    }

    async confirmAddToCollection(figureId) {
        const selectedCollection = document.querySelector('input[name="collection"]:checked');
        
        if (!selectedCollection) {
            alert('Por favor, selecione uma coleção.');
            return;
        }

        const colecaoId = selectedCollection.value;

        try {
            const response = await fetch('/action-figures/adicionar-existente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `figureId=${figureId}&colecaoId=${colecaoId}`
            });

            if (response.ok) {
                alert('Figura adicionada à coleção com sucesso!');
                this.closeModal();
            } else {
                throw new Error('Erro ao adicionar figura à coleção');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao adicionar figura à coleção. Tente novamente.');
        }
    }

    closeModal() {
        const modal = document.getElementById('collection-modal');
        if (modal) {
            modal.style.display = 'none';
        }
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
function addToCollection(figureId) {
    if (window.searchManager) {
        window.searchManager.addToCollection(figureId);
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.searchManager = new SearchManager();
});
