// ============================================
// ACTION_FIGURE.JS - DETALHES DA FIGURE
// ============================================

const USUARIO_ID = 1;
let figureId = null;
let figureData = null;

document.addEventListener('DOMContentLoaded', async () => {
    await loadFigure();
    await loadRelatedFigures();
    setupEventListeners();
});

// ==========================
// CARREGAR DADOS DA FIGURE
// ==========================

async function loadFigure() {
    // Pegar ID da URL
    const params = new URLSearchParams(window.location.search);
    figureId = params.get('id');
    
    if (!figureId) {
        alert('Action Figure não encontrada');
        window.location.href = 'dashboard.html';
        return;
    }
    
    try {
        figureData = await CatalogoAPI.buscarPorId(figureId);
        renderFigure(figureData);
    } catch (error) {
        console.error('Erro ao carregar figure:', error);
        alert('Erro ao carregar action figure');
    }
}

// ==========================
// RENDERIZAR FIGURE
// ==========================

function renderFigure(figure) {
    // Imagem
    const imgContainer = document.querySelector('.figure-image img');
    if (imgContainer) {
        imgContainer.src = figure.urlFoto || 'images/placeholder.png';
        imgContainer.alt = figure.nome;
        imgContainer.style.width = '100%';
        imgContainer.style.borderRadius = '8px';
    }
    
    // Nome
    const title = document.querySelector('.figure-info h1');
    if (title) {
        title.textContent = figure.nome;
    }
    
    // Subtítulo (categoria)
    const subtitle = document.querySelector('.figure-subtitle');
    if (subtitle) {
        subtitle.textContent = `da franquia ${figure.categoria}`;
    }
    
    // Data de lançamento
    const releaseDate = document.querySelector('.release-date');
    if (releaseDate && figure.anoLancamento) {
        releaseDate.textContent = `Lançada em ${figure.anoLancamento}`;
    } else if (releaseDate) {
        releaseDate.style.display = 'none';
    }
    
    // Descrição
    const description = document.querySelector('.description');
    if (description) {
        description.textContent = figure.descricao || 'Sem descrição disponível.';
    }
    
    // Categorias/Tags
    const categoryDiv = document.querySelector('.category');
    if (categoryDiv) {
        categoryDiv.innerHTML = '<p>Categorias</p>';
        
        // Adicionar tags
        const tags = [
            figure.categoria,
            figure.fabricante,
            figure.escala
        ].filter(Boolean);
        
        tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.textContent = tag;
            categoryDiv.appendChild(span);
        });
        
        // Adicionar preço se disponível
        if (figure.precoSugerido) {
            const priceTag = document.createElement('span');
            priceTag.className = 'tag';
            priceTag.style.background = '#4caf50';
            priceTag.style.borderColor = '#4caf50';
            priceTag.textContent = `R$ ${figure.precoSugerido.toFixed(2)}`;
            categoryDiv.appendChild(priceTag);
        }
    }
}

// ==========================
// CARREGAR FIGURES RELACIONADAS
// ==========================

async function loadRelatedFigures() {
    if (!figureData) return;
    
    try {
        // Buscar da mesma categoria
        const sameFranchise = await CatalogoAPI.buscarPorCategoria(figureData.categoria);
        const filtradas = sameFranchise.filter(f => f.id != figureId).slice(0, 3);
        
        const franchiseGrid = document.querySelector('.section-block:first-of-type .cards-line-figure');
        if (franchiseGrid) {
            renderRelatedCards(franchiseGrid, filtradas);
        }
        
        // Buscar do mesmo fabricante
        if (figureData.fabricante) {
            const sameManufacturer = await CatalogoAPI.buscarPorFabricante(figureData.fabricante);
            const filtradasFab = sameManufacturer.filter(f => f.id != figureId).slice(0, 3);
            
            const relatedGrid = document.querySelector('.section-block:last-of-type .cards-line-figure');
            if (relatedGrid) {
                renderRelatedCards(relatedGrid, filtradasFab);
            }
        }
        
    } catch (error) {
        console.error('Erro ao carregar relacionadas:', error);
    }
}

// ==========================
// RENDERIZAR CARDS RELACIONADOS
// ==========================

function renderRelatedCards(container, figures) {
    container.innerHTML = '';
    
    if (figures.length === 0) {
        container.innerHTML = '<p style="padding: 20px;">Nenhuma figure relacionada encontrada</p>';
        return;
    }
    
    figures.forEach(figure => {
        const card = document.createElement('div');
        card.className = 'card-figure';
        card.style.cursor = 'pointer';
        card.style.position = 'relative';
        card.style.overflow = 'hidden';
        
        card.innerHTML = `
            <img src="${figure.urlFoto || 'images/placeholder.png'}" 
                 alt="${figure.nome}"
                 style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">
            <div style="
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                background: linear-gradient(transparent, rgba(0,0,0,0.8));
                padding: 10px;
                color: white;
            ">
                <p style="margin: 0; font-size: 12px; font-weight: bold;">${figure.nome}</p>
                <p style="margin: 0; font-size: 10px; opacity: 0.8;">${figure.categoria}</p>
            </div>
        `;
        
        card.addEventListener('click', () => {
            window.location.href = `action_figure.html?id=${figure.id}`;
        });
        
        container.appendChild(card);
    });
}

// ==========================
// CONFIGURAR EVENT LISTENERS
// ==========================

function setupEventListeners() {
    // Botão Adicionar
    const btnAdd = document.querySelector('.figure-image .btn-primary');
    if (btnAdd) {
        btnAdd.addEventListener('click', adicionarAColecao);
    }
}

// ==========================
// ADICIONAR À COLEÇÃO
// ==========================

async function adicionarAColecao() {
    try {
        // Buscar coleções do usuário
        const todasColecoes = await ColecaoAPI.listarTodas();
        const colecoesUsuario = todasColecoes.filter(c => c.colecionadorId === USUARIO_ID);
        
        if (colecoesUsuario.length === 0) {
            if (confirm('Você ainda não tem coleções. Deseja criar uma agora?')) {
                window.location.href = 'criando_colecao.html';
            }
            return;
        }
        
        // Criar modal de seleção de coleção
        showCollectionSelector(colecoesUsuario);
        
    } catch (error) {
        console.error('Erro ao adicionar:', error);
        alert('Erro ao adicionar à coleção');
    }
}

// ==========================
// MODAL DE SELEÇÃO
// ==========================

function showCollectionSelector(colecoes) {
    const optionsHTML = colecoes.map(c => 
        `<option value="${c.id}">${c.nome}</option>`
    ).join('');
    
    const modal = `
        <div id="selectorModal" style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        ">
            <div style="
                background: #3a3952;
                padding: 30px;
                border-radius: 12px;
                max-width: 400px;
                width: 90%;
            ">
                <h3 style="margin-bottom: 20px;">Adicionar à Coleção</h3>
                
                <select id="colecaoSelect" style="
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 15px;
                    border-radius: 6px;
                    background: #4a495a;
                    color: white;
                    border: none;
                    font-size: 14px;
                ">
                    ${optionsHTML}
                </select>
                
                <label style="display: block; margin-bottom: 10px; font-size: 14px;">
                    Observações (opcional):
                </label>
                <textarea id="observacoes" style="
                    width: 100%;
                    padding: 10px;
                    border-radius: 6px;
                    background: #4a495a;
                    color: white;
                    border: none;
                    margin-bottom: 20px;
                    resize: vertical;
                " rows="3"></textarea>
                
                <div style="display: flex; gap: 10px;">
                    <button onclick="confirmarAdicao()" style="
                        flex: 1;
                        padding: 12px;
                        background: #c77dff;
                        color: white;
                        border: none;
                        border-radius: 6px;
                        cursor: pointer;
                        font-weight: bold;
                    ">Adicionar</button>
                    
                    <button onclick="closeSelector()" style="
                        flex: 1;
                        padding: 12px;
                        background: #5a5a7a;
                        color: white;
                        border: none;
                        border-radius: 6px;
                        cursor: pointer;
                    ">Cancelar</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modal);
}

// Função global para fechar selector
window.closeSelector = function() {
    const modal = document.getElementById('selectorModal');
    if (modal) modal.remove();
};

// Função global para confirmar adição
window.confirmarAdicao = async function() {
    const colecaoId = document.getElementById('colecaoSelect').value;
    const observacoes = document.getElementById('observacoes').value.trim();
    
    try {
        const detalhes = {
            estado: 'Novo',
            favorito: false
        };
        
        if (observacoes) {
            detalhes.observacoes = observacoes;
        }
        
        await ItemColecaoAPI.adicionar(colecaoId, figureId, detalhes);
        
        closeSelector();
        alert('Action Figure adicionada à coleção com sucesso!');
        
    } catch (error) {
        console.error('Erro ao adicionar:', error);
        alert(error.message || 'Erro ao adicionar à coleção');
    }
};