// ============================================
// MINHA_COLECAO.JS - VISUALIZAR COLEÇÃO
// ============================================

let colecaoId = null;
let colecaoData = null;

document.addEventListener('DOMContentLoaded', async () => {
    await loadColecao();
    setupEventListeners();
});

// ==========================
// CARREGAR DADOS DA COLEÇÃO
// ==========================

async function loadColecao() {
    // Pegar ID da URL
    const params = new URLSearchParams(window.location.search);
    colecaoId = params.get('id');
    
    if (!colecaoId) {
        alert('Coleção não encontrada');
        window.location.href = 'dashboard.html';
        return;
    }
    
    try {
        // Buscar dados da coleção
        colecaoData = await ColecaoAPI.buscarPorId(colecaoId);
        
        // Buscar itens da coleção
        const itens = await ItemColecaoAPI.listarItens(colecaoId);
        
        // Renderizar
        renderColecaoInfo(colecaoData, itens.length);
        renderItens(itens);
        
    } catch (error) {
        console.error('Erro ao carregar coleção:', error);
        alert('Erro ao carregar coleção');
        window.location.href = 'dashboard.html';
    }
}

// ==========================
// RENDERIZAR INFORMAÇÕES
// ==========================

function renderColecaoInfo(colecao, totalItens) {
    // Título
    const title = document.getElementById('title-colecao');
    if (title) {
        title.textContent = colecao.nome;
    }
    
    // Descrição
    const description = document.getElementById('description');
    if (description) {
        description.textContent = colecao.descricao;
    }
    
    // Total de itens
    const small = document.querySelector('.colecao-info small');
    if (small) {
        small.textContent = `${totalItens} Action Figure${totalItens !== 1 ? 's' : ''}`;
    }
    
    // Data de modificação (se disponível)
    const dataModificacao = document.querySelector('.aside-edit small');
    if (dataModificacao) {
        const hoje = new Date().toLocaleDateString('pt-BR');
        dataModificacao.textContent = `Última modificação: ${hoje}`;
    }
}

// ==========================
// RENDERIZAR ITENS (CARDS)
// ==========================

function renderItens(itens) {
    const grid = document.querySelector('.card-grid1');
    
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (itens.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
                <p style="margin-bottom: 20px;">Nenhuma action figure nesta coleção ainda</p>
                <button onclick="window.location.href='criando_colecao.html'" 
                        style="background: #c77dff; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">
                    Adicionar Figures
                </button>
            </div>
        `;
        return;
    }
    
    itens.forEach(item => {
        const card = document.createElement('div');
        card.className = 'cards1';
        
        const figure = item.actionFigure;
        
        card.innerHTML = `
            <img src="${figure.urlFoto || 'images/placeholder.png'}" alt="${figure.nome}">
            <h3>${figure.nome}</h3>
            <span class="status ${item.favorito ? 'favorito' : ''}">
                ${item.favorito ? '⭐ Favorito' : 'Na Coleção'}
            </span>
            <div style="padding: 12px; font-size: 12px; color: #b0b0b0;">
                ${item.estado ? `<p>Estado: ${item.estado}</p>` : ''}
                ${item.precoCompra ? `<p>Pago: R$ ${item.precoCompra.toFixed(2)}</p>` : ''}
                ${item.observacoes ? `<p style="font-style: italic;">${item.observacoes}</p>` : ''}
            </div>
        `;
        
        // Evento de clique no card
        card.addEventListener('click', () => {
            showItemDetails(item);
        });
        
        grid.appendChild(card);
    });
}

// ==========================
// MOSTRAR DETALHES DO ITEM
// ==========================

function showItemDetails(item) {
    const figure = item.actionFigure;
    
    const modal = `
        <div id="itemModal" style="
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
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
            ">
                <h2 style="margin-bottom: 20px;">${figure.nome}</h2>
                <img src="${figure.urlFoto}" alt="${figure.nome}" 
                     style="width: 100%; border-radius: 8px; margin-bottom: 20px;">
                
                <div style="margin-bottom: 20px;">
                    <p><strong>Categoria:</strong> ${figure.categoria}</p>
                    <p><strong>Fabricante:</strong> ${figure.fabricante || 'N/A'}</p>
                    <p><strong>Preço Sugerido:</strong> ${figure.precoSugerido ? 'R$ ' + figure.precoSugerido.toFixed(2) : 'N/A'}</p>
                    ${item.precoCompra ? `<p><strong>Preço Pago:</strong> R$ ${item.precoCompra.toFixed(2)}</p>` : ''}
                    ${item.estado ? `<p><strong>Estado:</strong> ${item.estado}</p>` : ''}
                    ${item.observacoes ? `<p><strong>Observações:</strong> ${item.observacoes}</p>` : ''}
                    <p><strong>Adicionado em:</strong> ${new Date(item.dataAdicao).toLocaleDateString('pt-BR')}</p>
                </div>
                
                <div style="display: flex; gap: 10px; margin-top: 20px;">
                    <button onclick="toggleFavorito(${item.id}, ${!item.favorito})" 
                            style="flex: 1; padding: 10px; background: ${item.favorito ? '#ff6b6b' : '#ffd700'}; 
                                   color: white; border: none; border-radius: 6px; cursor: pointer;">
                        ${item.favorito ? 'Remover Favorito' : 'Marcar Favorito'}
                    </button>
                    <button onclick="removerItem(${item.id})" 
                            style="flex: 1; padding: 10px; background: #ff6b6b; color: white; 
                                   border: none; border-radius: 6px; cursor: pointer;">
                        Remover da Coleção
                    </button>
                </div>
                
                <button onclick="closeModal()" 
                        style="width: 100%; padding: 10px; background: #5a5a7a; color: white; 
                               border: none; border-radius: 6px; cursor: pointer; margin-top: 10px;">
                    Fechar
                </button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modal);
}

// Função global para fechar modal
window.closeModal = function() {
    const modal = document.getElementById('itemModal');
    if (modal) modal.remove();
};

// ==========================
// TOGGLE FAVORITO
// ==========================

window.toggleFavorito = async function(itemId, favorito) {
    try {
        await ItemColecaoAPI.toggleFavorito(colecaoId, itemId, favorito);
        closeModal();
        await loadColecao(); // Recarregar
        alert(favorito ? 'Marcado como favorito!' : 'Removido dos favoritos');
    } catch (error) {
        console.error('Erro ao alterar favorito:', error);
        alert('Erro ao alterar favorito');
    }
};

// ==========================
// REMOVER ITEM
// ==========================

window.removerItem = async function(itemId) {
    if (!confirm('Tem certeza que deseja remover esta figure da coleção?')) {
        return;
    }
    
    try {
        await ItemColecaoAPI.remover(colecaoId, itemId);
        closeModal();
        await loadColecao(); // Recarregar
        alert('Figure removida da coleção');
    } catch (error) {
        console.error('Erro ao remover item:', error);
        alert('Erro ao remover item');
    }
};

// ==========================
// CONFIGURAR EVENT LISTENERS
// ==========================

function setupEventListeners() {
    // Botão Editar
    const btnEdit = document.getElementById('btn-edit');
    if (btnEdit) {
        btnEdit.addEventListener('click', editarColecao);
    }
    
    // Botão Deletar
    const btnDelete = document.getElementById('btn-delete');
    if (btnDelete) {
        btnDelete.addEventListener('click', excluirColecao);
    }
}

// ==========================
// EDITAR COLEÇÃO
// ==========================

function editarColecao() {
    // Implementar edição (futuramente)
    alert('Funcionalidade de edição será implementada em breve');
}

// ==========================
// EXCLUIR COLEÇÃO
// ==========================

async function excluirColecao() {
    if (!confirm('Tem certeza que deseja excluir esta coleção? Esta ação não pode ser desfeita.')) {
        return;
    }
    
    try {
        await ColecaoAPI.deletar(colecaoId);
        alert('Coleção excluída com sucesso');
        window.location.href = 'dashboard.html';
    } catch (error) {
        console.error('Erro ao excluir coleção:', error);
        alert('Erro ao excluir coleção');
    }
}

// ==========================
// CSS ADICIONAL
// ==========================

const style = document.createElement('style');
style.textContent = `
    .status.favorito {
        background: #ffd700 !important;
        color: #000 !important;
    }
`;
document.head.appendChild(style);
