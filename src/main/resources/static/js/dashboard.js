// dashboard.js - Painel do usuário com estatísticas e coleções

class DashboardManager {
    constructor() {
        this.user = null;
        this.collections = [];
        this.userFigures = [];
        this.init();
    }

    async init() {
        // Verificar autenticação
        if (!requireAuth()) return;

        this.user = getCurrentUser();
        this.setupEventListeners();
        await this.loadDashboardData();
        this.renderUserInfo();
    }

    setupEventListeners() {
        // Logout
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                LoginManager.logout();
            });
        }

        // Criar nova coleção
        const createCollectionBtn = document.getElementById('create-collection-btn');
        if (createCollectionBtn) {
            createCollectionBtn.addEventListener('click', () => {
                this.showCreateCollectionModal();
            });
        }

        // Toggle menu mobile
        const menuToggle = document.getElementById('menu-toggle');
        const sidebar = document.getElementById('sidebar');
        
        if (menuToggle && sidebar) {
            menuToggle.addEventListener('click', () => {
                sidebar.classList.toggle('active');
            });
        }
    }

    async loadDashboardData() {
        try {
            // Carregar coleções do usuário
            await this.loadUserCollections();
            
            // Carregar figuras do usuário
            await this.loadUserFigures();
            
            // Calcular estatísticas
            this.calculateStatistics();
            
            // Renderizar dashboard
            this.renderDashboard();
        } catch (error) {
            console.error('Erro ao carregar dados do dashboard:', error);
            this.showError('Falha ao carregar seus dados. Tente novamente.');
        }
    }

    async loadUserCollections() {
        try {
            // Simulação - endpoint específico para coleções do usuário
            // Na implementação real, você teria um endpoint como: /colecoes/usuario/{userId}
            const response = await fetch('/colecoes/listar');
            if (response.ok) {
                this.collections = await response.json();
                // Filtrar coleções do usuário atual
                this.collections = this.collections.filter(collection => 
                    collection.colecionadorId === this.user.id
                );
            }
        } catch (error) {
            console.error('Erro ao carregar coleções:', error);
            this.collections = [];
        }
    }

    async loadUserFigures() {
        try {
            // Carregar todas as figuras e filtrar as do usuário
            const response = await fetch('/action-figures/listar');
            if (response.ok) {
                const allFigures = await response.json();
                this.userFigures = allFigures.filter(figure => 
                    figure.colecaoId && this.collections.some(collection => 
                        collection.id === figure.colecaoId
                    )
                );
            }
        } catch (error) {
            console.error('Erro ao carregar figuras:', error);
            this.userFigures = [];
        }
    }

    calculateStatistics() {
        this.stats = {
            totalFigures: this.userFigures.length,
            totalCollections: this.collections.length,
            categories: this.getCategoryStats(),
            franchises: this.getFranchiseStats()
        };
    }

    getCategoryStats() {
        const categories = {};
        this.userFigures.forEach(figure => {
            const category = figure.categoria || 'Geral';
            categories[category] = (categories[category] || 0) + 1;
        });
        return categories;
    }

    getFranchiseStats() {
        const franchises = {};
        this.userFigures.forEach(figure => {
            const franchise = figure.franquia || 'Sem franquia';
            franchises[franchise] = (franchises[franchise] || 0) + 1;
        });
        return franchises;
    }

    renderUserInfo() {
        const userNameElement = document.getElementById('user-name');
        const userEmailElement = document.getElementById('user-email');
        
        if (userNameElement) {
            userNameElement.textContent = this.user.username;
        }
        
        if (userEmailElement) {
            userEmailElement.textContent = this.user.email;
        }
    }

    renderDashboard() {
        this.renderStatistics();
        this.renderCollections();
        this.renderRecentFigures();
        this.renderCharts();
    }

    renderStatistics() {
        const statsContainer = document.getElementById('stats-container');
        if (!statsContainer) return;

        statsContainer.innerHTML = `
            <div class="stat-card">
                <h3>${this.stats.totalFigures}</h3>
                <p>Figuras na Coleção</p>
            </div>
            <div class="stat-card">
                <h3>${this.stats.totalCollections}</h3>
                <p>Coleções Criadas</p>
            </div>
            <div class="stat-card">
                <h3>${Object.keys(this.stats.categories).length}</h3>
                <p>Categorias Diferentes</p>
            </div>
            <div class="stat-card">
                <h3>${Object.keys(this.stats.franchises).length}</h3>
                <p>Franquias Diferentes</p>
            </div>
        `;
    }

    renderCollections() {
        const collectionsContainer = document.getElementById('collections-container');
        if (!collectionsContainer) return;

        if (this.collections.length === 0) {
            collectionsContainer.innerHTML = '<p class="no-collections">Você ainda não tem coleções. Crie sua primeira coleção!</p>';
            return;
        }

        collectionsContainer.innerHTML = this.collections.map(collection => {
            const figureCount = this.userFigures.filter(f => f.colecaoId === collection.id).length;
            return `
                <div class="collection-card">
                    <h3>${collection.nome}</h3>
                    <p>${collection.descricao || 'Sem descrição'}</p>
                    <div class="collection-stats">
                        <span>${figureCount} figuras</span>
                        <span>Criada em ${new Date(collection.dataCriacao).toLocaleDateString()}</span>
                    </div>
                    <div class="collection-actions">
                        <button class="btn btn-primary" onclick="viewCollection(${collection.id})">Ver Coleção</button>
                        <button class="btn btn-secondary" onclick="editCollection(${collection.id})">Editar</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderRecentFigures() {
        const recentFiguresContainer = document.getElementById('recent-figures');
        if (!recentFiguresContainer) return;

        const recentFigures = this.userFigures.slice(-6).reverse();
        
        if (recentFigures.length === 0) {
            recentFiguresContainer.innerHTML = '<p class="no-figures">Você ainda não adicionou figuras às suas coleções.</p>';
            return;
        }

        recentFiguresContainer.innerHTML = recentFigures.map(figure => `
            <div class="figure-card">
                <img src="${figure.urlFoto || 'https://via.placeholder.com/150'}" 
                     alt="${figure.nome}" 
                     onerror="this.src='https://via.placeholder.com/150/cccccc/666666?text=Sem+Imagem'">
                <h4>${figure.nome}</h4>
                <p>${figure.franquia || 'Sem franquia'}</p>
                <a href="/detalhes?id=${figure.id}" class="btn btn-small">Ver Detalhes</a>
            </div>
        `).join('');
    }

    renderCharts() {
        this.renderCategoryChart();
        this.renderFranchiseChart();
    }

    renderCategoryChart() {
        const chartContainer = document.getElementById('category-chart');
        if (!chartContainer) return;

        const categories = Object.entries(this.stats.categories);
        if (categories.length === 0) {
            chartContainer.innerHTML = '<p>Sem dados de categorias</p>';
            return;
        }

        // Simulação de gráfico (em produção, use Chart.js ou similar)
        chartContainer.innerHTML = `
            <h4>Distribuição por Categoria</h4>
            <div class="chart-bars">
                ${categories.map(([category, count]) => `
                    <div class="chart-bar">
                        <span class="bar-label">${category}</span>
                        <div class="bar" style="width: ${(count / this.stats.totalFigures) * 100}%"></div>
                        <span class="bar-value">${count}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderFranchiseChart() {
        const chartContainer = document.getElementById('franchise-chart');
        if (!chartContainer) return;

        const franchises = Object.entries(this.stats.franchises);
        if (franchises.length === 0) {
            chartContainer.innerHTML = '<p>Sem dados de franquias</p>';
            return;
        }

        chartContainer.innerHTML = `
            <h4>Distribuição por Franquia</h4>
            <div class="chart-bars">
                ${franchises.map(([franchise, count]) => `
                    <div class="chart-bar">
                        <span class="bar-label">${franchise}</span>
                        <div class="bar" style="width: ${(count / this.stats.totalFigures) * 100}%"></div>
                        <span class="bar-value">${count}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    showCreateCollectionModal() {
        // Implementar modal para criar nova coleção
        const modal = document.getElementById('create-collection-modal');
        if (modal) {
            modal.style.display = 'block';
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

// Funções globais para manipulação de coleções
function viewCollection(collectionId) {
    window.location.href = `/colecao/${collectionId}`;
}

function editCollection(collectionId) {
    // Implementar edição de coleção
    console.log('Editar coleção:', collectionId);
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new DashboardManager();
});
