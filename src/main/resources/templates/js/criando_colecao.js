// ============================================
// CRIANDO_COLECAO.JS - CRIAR NOVA COLEÇÃO
// ============================================

const USUARIO_ID = 1; // Simular usuário logado
let selectedFigures = []; // Figures selecionadas

document.addEventListener('DOMContentLoaded', async () => {

    // ==========================
    // CARREGAR FIGURES INICIAIS
    // ==========================
    
    await loadInitialFigures();

    // ==========================
    // PESQUISA DE FIGURES
    // ==========================
    
    const searchInput = document.querySelector('.search-figures');
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', async (e) => {
            const termo = e.target.value.trim();
            
            // Debounce para evitar muitas requisições
            clearTimeout(searchTimeout);
            
            if (termo.length < 2) {
                await loadInitialFigures();
                return;
            }
            
            searchTimeout = setTimeout(async () => {
                try {
                    const resultados = await CatalogoAPI.pesquisar(termo);
                    renderFigures(resultados);
                } catch (error) {
                    console.error('Erro na busca:', error);
                }
            }, 300);
        });
    }

    // ==========================
    // SUBMIT DO FORMULÁRIO
    // ==========================
    
    const form = document.getElementById('collection-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await handleSubmit();
        });
    }
    
    // ==========================
    // BOTÃO CANCELAR
    // ==========================
    
    const btnCancel = document.querySelector('.btn-cancel');
    if (btnCancel) {
        btnCancel.addEventListener('click', cancelForm);
    }
});

// ==========================
// CARREGAR FIGURES INICIAIS
// ==========================

async function loadInitialFigures() {
    try {
        const figures = await CatalogoAPI.listarTodas();
        const primeiras10 = figures.slice(0, 10);
        renderFigures(primeiras10);
    } catch (error) {
        console.error('Erro ao carregar figures:', error);
    }
}

// ==========================
// RENDERIZAR CARDS DE FIGURES
// ==========================

function renderFigures(figures) {
    const grid = document.querySelector('.figures-grid') || 
                 document.querySelector('.figure-grid');
    
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (figures.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 20px;">Nenhuma figure encontrada</p>';
        return;
    }
    
    figures.forEach(figure => {
        const card = document.createElement('div');
        card.className = 'figure-card';
        card.dataset.figureId = figure.id;
        
        // Verificar se já está selecionada
        const isSelected = selectedFigures.some(f => f.id === figure.id);
        if (isSelected) {
            card.classList.add('selected');
        }
        
        // Estrutura do card
        card.innerHTML = `
            <img src="${figure.urlFoto || 'images/placeholder.png'}" 
                 alt="${figure.nome}"
                 style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">
            <div style="position: absolute; bottom: 5px; left: 5px; right: 5px; background: rgba(0,0,0,0.7); padding: 5px; border-radius: 4px;">
                <p style="font-size: 11px; margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                    ${figure.nome}
                </p>
            </div>
        `;
        
        card.style.position = 'relative';
        card.style.cursor = 'pointer';
        card.style.transition = 'transform 0.2s, border 0.2s';
        
        // Evento de clique
        card.addEventListener('click', () => toggleFigureSelection(card, figure));
        
        grid.appendChild(card);
    });
}

// ==========================
// SELECIONAR/DESSELECIONAR
// ==========================

function toggleFigureSelection(card, figure) {
    const index = selectedFigures.findIndex(f => f.id === figure.id);
    
    if (index > -1) {
        // Remover da seleção
        selectedFigures.splice(index, 1);
        card.classList.remove('selected');
        card.style.border = 'none';
    } else {
        // Adicionar à seleção
        selectedFigures.push(figure);
        card.classList.add('selected');
        card.style.border = '3px solid #c77dff';
    }
    
    console.log('Figures selecionadas:', selectedFigures.length);
}

// ==========================
// VALIDAR FORMULÁRIO
// ==========================

function validateForm() {
    const title = document.querySelector('input[name="title"]').value.trim();
    const description = document.querySelector('textarea[name="description"]').value.trim();
    
    if (!title) {
        alert('Por favor, insira um título para a coleção');
        return false;
    }
    
    if (title.length < 3) {
        alert('O título deve ter pelo menos 3 caracteres');
        return false;
    }
    
    if (!description) {
        alert('Por favor, insira uma descrição para a coleção');
        return false;
    }
    
    if (selectedFigures.length === 0) {
        alert('Por favor, selecione pelo menos uma action figure');
        return false;
    }
    
    return true;
}

// ==========================
// ENVIAR FORMULÁRIO
// ==========================

async function handleSubmit() {
    if (!validateForm()) return;
    
    const title = document.querySelector('input[name="title"]').value.trim();
    const description = document.querySelector('textarea[name="description"]').value.trim();
    const btnSave = document.querySelector('.btn-save');
    
    // Desabilitar botão
    btnSave.textContent = 'Salvando...';
    btnSave.disabled = true;
    
    try {
        // 1. Criar a coleção
        const colecaoData = {
            nome: title,
            descricao: description,
            visibilidade: 'PUBLICA', // ou PRIVADA
            colecionadorId: USUARIO_ID
        };
        
        const novaColecao = await ColecaoAPI.criar(colecaoData);
        console.log('Coleção criada:', novaColecao);
        
        // 2. Adicionar cada figure selecionada à coleção
        for (const figure of selectedFigures) {
            try {
                await ItemColecaoAPI.adicionar(novaColecao.id, figure.id, {
                    estado: 'Novo',
                    favorito: false
                });
            } catch (error) {
                console.error(`Erro ao adicionar figure ${figure.nome}:`, error);
            }
        }
        
        alert('Coleção criada com sucesso!');
        window.location.href = `minha_colecao.html?id=${novaColecao.id}`;
        
    } catch (error) {
        console.error('Erro ao criar coleção:', error);
        alert('Erro ao criar coleção: ' + error.message);
    } finally {
        btnSave.textContent = 'Salvar';
        btnSave.disabled = false;
    }
}

// ==========================
// CANCELAR
// ==========================

function cancelForm() {
    if (confirm('Deseja cancelar? As alterações não serão salvas.')) {
        window.location.href = 'dashboard.html';
    }
}

// ==========================
// ADICIONAR CSS DINÂMICO
// ==========================

const style = document.createElement('style');
style.textContent = `
    .figure-card {
        background: #e0e0e0;
        border-radius: 8px;
        aspect-ratio: 2/3;
        position: relative;
        overflow: hidden;
    }
    
    .figure-card.selected {
        border: 3px solid #c77dff !important;
        transform: scale(1.05);
    }
    
    .figure-card:hover {
        transform: scale(1.05);
    }
    
    .figures-grid,
    .figure-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 15px;
        margin-bottom: 30px;
    }
`;
document.head.appendChild(style);