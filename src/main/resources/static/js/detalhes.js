// detalhes.js - Página de detalhes de action figures

class DetailsManager {
    constructor() {
        this.figure = null;
        this.relatedFigures = [];
        this.init();
    }

    async init() {
        await this.loadFigureDetails();
        await this.loadRelatedFigures();
        this.renderDetails();
        this.setupEventListeners();
    }

    async loadFigureDetails() {
        const urlParams = new URLSearchParams(window.location.search);
        const figureId = urlParams.get('id');

        if (!figureId) {
            this.showError('ID da figura não encontrado.');
            return;
        }

        try {
            const response = await fetch(`/action-figures/${figureId}`);
            if (!response.ok) {
                if (response.status === 404) {
                    this.showError('Figura não encontrada.');
                } else {
                    throw new Error('Erro ao carregar detalhes da figura.');
                }
                return;
            }
            
            this.figure = await response.json();
        } catch (error) {
            console.error('Erro:', error);
            this.showError('Falha ao carregar os detalhes. Tente novamente mais tarde.');
        }
    }

    async loadRelatedFigures() {
        if (!this.figure) return;

        try {
            // Carregar figuras da mesma franquia
            if (this.figure.franquia) {
                const response = await fetch(`/action-figures/buscar-por-franquia?franquia=${encodeURIComponent(this.figure.franquia)}`);
                if (response.ok) {
                    const franchiseFigures = await response.json();
                    // Remover a figura atual e limitar a 6 relacionadas
                    this.relatedFigures = franchiseFigures
                        .filter(f => f.id !== this.figure.id)
                        .slice(0, 6);
                }
            }

            // Se não houver figuras da mesma franquia, carregar novidades
            if (this.relatedFigures.length === 0) {
                const response = await fetch('/action-figures/novidades');
                if (response.ok) {
                    const novidades = await response.json();
                    this.relatedFigures = novidades
                        .filter(f => f.id !== this.figure.id)
                        .slice(0, 6);
                }
            }
        } catch (error) {
            console.error('Erro ao carregar figuras relacionadas:', error);
            this.relatedFigures = [];
        }
    }

    renderDetails() {
        if (!this.figure) return;

        // Atualizar título da página
        document.title = `${this.figure.nome} - Figurama`;

        // Renderizar imagem principal
        this.renderMainImage();
        
        // Renderizar informações
        this.renderFigureInfo();
        
        // Renderizar figuras relacionadas
        this.renderRelatedFigures();

        // Atualizar breadcrumbs
        this.updateBreadcrumbs();
    }

    renderMainImage() {
        const imageContainer = document.getElementById('main-image');
        if (!imageContainer) return;

        imageContainer.innerHTML = `
            <img src="${this.figure.urlFoto || 'https://via.placeholder.com/500'}" 
                 alt="${this.figure.nome}" 
                 onerror="this.src='https://via.placeholder.com/500/cccccc/666666?text=Sem+Imagem'"
                 class="main-figure-image">
            <div class="image-overlay">
                ${this.figure.ativo ? '<span class="status-badge available">Disponível</span>' : '<span class="status-badge unavailable">Indisponível</span>'}
            </div>
        `;
    }

    renderFigureInfo() {
        const infoContainer = document.getElementById('figure-info');
        if (!infoContainer) return;

        infoContainer.innerHTML = `
            <h1>${this.figure.nome}</h1>
            
            <div class="figure-meta">
                <span class="franchise">${this.figure.franquia || 'Sem franquia'}</span>
                <span class="category">${this.figure.categoria || 'Geral'}</span>
                <span class="year">${this.figure.anoLancamento || 'Ano desconhecido'}</span>
            </div>

            <div class="figure-description">
                <h3>Descrição</h3>
                <p>${this.figure.descricao || 'Nenhuma descrição disponível para esta figura.'}</p>
            </div>

            <div class="figure-actions">
                <button class="btn btn-primary btn-large" onclick="detailsManager.addToCollection()">
                    Adicionar à Minha Coleção
                </button>
                <button class="btn btn-secondary" onclick="detailsManager.shareFigure()">
                    Compartilhar
                </button>
                <button class="btn btn-outline" onclick="detailsManager.addToWishlist()">
                    Adicionar à Lista de Desejos
                </button>
            </div>

            <div class="figure-specs">
                <h3>Especificações</h3>
                <div class="specs-grid">
                    <div class="spec-item">
                        <strong>Franquia:</strong>
                        <span>${this.figure.franquia || 'Não informada'}</span>
                    </div>
                    <div class="spec-item">
                        <strong>Categoria:</strong>
                        <span>${this.figure.categoria || 'Geral'}</span>
                    </div>
                    <div class="spec-item">
                        <strong>Ano de Lançamento:</strong>
                        <span>${this.figure.anoLancamento || 'Não informado'}</span>
                    </div>
                    <div class="spec-item">
                        <strong>Status:</strong>
                        <span>${this.figure.ativo ? 'Disponível' : 'Indisponível'}</span>
                    </div>
                    <div class="spec-item">
                        <strong>ID:</strong>
                        <span>#${this.figure.id}</span>
                    </div>
                </div>
            </div>
        `;
    }

    renderRelatedFigures() {
        const relatedContainer = document.getElementById('related-figures');
        if (!relatedContainer) return;

        if (this.relatedFigures.length === 0) {
            relatedContainer.innerHTML = `
                <div class="no-related">
                    <h3>Nenhuma figura relacionada encontrada</h3>
                    <p>Que tal explorar nosso catálogo completo?</p>
                    <a href="/explorar" class="btn btn-primary">Explorar Catálogo</a>
                </div>
            `;
            return;
        }

        relatedContainer.innerHTML = `
            <h3>Figuras Relacionadas</h3>
            <div class="related-grid">
                ${this.relatedFigures.map(figure => `
                    <div class="related-card">
                        <img src="${figure.urlFoto || 'https://via.placeholder.com/200'}" 
                             alt="${figure.nome}" 
                             onerror="this.src='https://via.placeholder.com/200/cccccc/666666?text=Sem+Imagem'">
                        <div class="related-info">
                            <h4>${figure.nome}</h4>
                            <p>${figure.franquia || 'Sem franquia'}</p>
                            <a href="/detalhes?id=${figure.id}" class="btn btn-small">Ver Detalhes</a>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    updateBreadcrumbs() {
        const breadcrumbsContainer = document.getElementById('breadcrumbs');
        if (!breadcrumbsContainer) return;

        breadcrumbsContainer.innerHTML = `
            <nav aria-label="Breadcrumb">
                <ol class="breadcrumb">
                    <li><a href="/">Home</a></li>
                    <li><a href="/explorar">Explorar</a></li>
                    ${this.figure.franquia ? `<li><a href="/explorar?franquia=${encodeURIComponent(this.figure.franquia)}">${this.figure.franquia}</a></li>` : ''}
                    <li class="current">${this.figure.nome}</li>
                </ol>
            </nav>
        `;
    }

    setupEventListeners() {
        // Zoom na imagem
        const mainImage = document.querySelector('.main-figure-image');
        if (mainImage) {
            mainImage.addEventListener('click', () => this.openImageModal());
        }

        // Teclas de atalho
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    async addToCollection() {
        // Verificar se usuário está logado
        if (!requireAuth()) return;

        try {
            const response = await fetch('/colecoes/listar');
            if (!response.ok) throw new Error('Erro ao carregar coleções');
            
            const collections = await response.json();
            const userCollections = collections.filter(c => c.colecionadorId === getCurrentUser().id);
            
            if (userCollections.length === 0) {
                if (confirm('Você não tem coleções. Deseja criar uma agora?')) {
                    window.location.href = '/colecoes/criar';
                }
                return;
            }

            this.showCollectionSelector(userCollections);
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao carregar suas coleções. Tente novamente.');
        }
    }

    showCollectionSelector(collections) {
        const modal = document.getElementById('collection-modal');
        const modalContent = modal?.querySelector('.modal-content');
        
        if (!modal || !modalContent) {
            this.createCollectionModal(collections);
            return;
        }

        modalContent.innerHTML = `
            <h3>Adicionar à Coleção</h3>
            <p>Selecione a coleção onde deseja adicionar <strong>${this.figure.nome}</strong>:</p>
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
                <button class="btn btn-secondary" onclick="detailsManager.closeModal()">Cancelar</button>
                <button class="btn btn-primary" onclick="detailsManager.confirmAddToCollection()">Adicionar</button>
            </div>
        `;
        
        modal.style.display = 'block';
    }

    async confirmAddToCollection() {
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
                body: `figureId=${this.figure.id}&colecaoId=${colecaoId}`
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

    shareFigure() {
        const shareUrl = window.location.href;
        const shareText = `Confira esta figura incrível: ${this.figure.nome} - Figurama`;

        if (navigator.share) {
            navigator.share({
                title: `${this.figure.nome} - Figurama`,
                text: shareText,
                url: shareUrl
            });
        } else {
            // Fallback: copiar para área de transferência
            navigator.clipboard.writeText(shareUrl).then(() => {
                alert('Link copiado para a área de transferência!');
            }).catch(() => {
                prompt('Copie o link:', shareUrl);
            });
        }
    }

    addToWishlist() {
        // Implementar lista de desejos
        alert('Funcionalidade de lista de desejos em desenvolvimento!');
    }

    openImageModal() {
        const modal = document.getElementById('image-modal');
        if (!modal) return;

        modal.innerHTML = `
            <div class="modal-content image-modal-content">
                <span class="close" onclick="detailsManager.closeModal()">&times;</span>
                <img src="${this.figure.urlFoto || 'https://via.placeholder.com/800'}" 
                     alt="${this.figure.nome}" 
                     onerror="this.src='https://via.placeholder.com/800/cccccc/666666?text=Sem+Imagem'">
            </div>
        `;
        
        modal.style.display = 'block';
    }

    closeModal() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
    }

    createCollectionModal(collections) {
        // Implementar criação dinâmica do modal
        console.log('Criar modal para coleções:', collections);
    }

    showError(message) {
        const errorContainer = document.getElementById('error-container');
        if (errorContainer) {
            errorContainer.innerHTML = `
                <div class="error-message">
                    <h3>Oops! Algo deu errado.</h3>
                    <p>${message}</p>
                    <a href="/" class="btn btn-primary">Voltar para Home</a>
                </div>
            `;
        }
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.detailsManager = new DetailsManager();
});
