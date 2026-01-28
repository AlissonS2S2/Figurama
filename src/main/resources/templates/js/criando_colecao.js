// ============================================
// CRIANDO_COLECAO.JS
// ============================================

let selectedFigures = []; // Array para guardar as figuras selecionadas
let usuarioLogadoId = null;

document.addEventListener('DOMContentLoaded', async () => {

    // 1. Verificar Login e Obter ID do Usuário
    const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (!userStr) {
        alert("Você precisa estar logado!");
        window.location.href = '/login';
        return;
    }
    
    const user = JSON.parse(userStr);
    usuarioLogadoId = user.id; // Pega o ID real do banco

    // 2. Carregar Figures Iniciais (As mais recentes ou todas)
    await loadInitialFigures();

    // 3. Configurar Pesquisa (Com delay para não travar)
    const searchInput = document.getElementById('search-figures');
    let searchTimeout;

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const termo = e.target.value.trim();
            clearTimeout(searchTimeout);
            
            searchTimeout = setTimeout(async () => {
                if (termo.length === 0) {
                    await loadInitialFigures(); // Se limpar, volta ao inicial
                } else {
                    try {
                        const resultados = await CatalogoAPI.pesquisar(termo);
                        renderFigures(resultados);
                    } catch (error) {
                        console.error('Erro na busca:', error);
                    }
                }
            }, 400); // Espera 400ms após parar de digitar
        });
    }

    // 4. Configurar Envio do Formulário
    const form = document.getElementById('collection-form');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
    
    // 5. Botão Cancelar
    const btnCancel = document.querySelector('.btn-cancel');
    if (btnCancel) {
        btnCancel.addEventListener('click', () => {
            if(confirm('Cancelar criação?')) window.location.href = '/dashboard';
        });
    }
});

// --- FUNÇÕES ---

async function loadInitialFigures() {
    const grid = document.getElementById('figures-grid');
    if(grid) grid.innerHTML = '<p style="color:#888">Carregando...</p>';

    try {
        // Busca todas (ou poderia ser uma rota de "populares")
        const figures = await CatalogoAPI.listarTodas();
        // Mostra as 12 primeiras para não pesar a tela
        renderFigures(figures.slice(0, 12));
    } catch (error) {
        console.error('Erro ao carregar figures:', error);
        if(grid) grid.innerHTML = '<p style="color:red">Erro ao carregar catálogo.</p>';
    }
}

function renderFigures(figures) {
    const grid = document.getElementById('figures-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (!figures || figures.length === 0) {
        grid.innerHTML = '<p style="color:#bbb; grid-column: 1/-1;">Nenhuma figure encontrada.</p>';
        return;
    }
    
    figures.forEach(figure => {
        // Verifica se essa figura já estava selecionada antes
        const isSelected = selectedFigures.some(f => f.id === figure.id);

        const card = document.createElement('div');
        card.className = `figure-card ${isSelected ? 'selected' : ''}`;
        
        // Estilo condicional para seleção
        const borderStyle = isSelected ? '3px solid #d682ff' : '3px solid transparent';
        
        card.style.cssText = `
            cursor: pointer;
            border: ${borderStyle};
            border-radius: 8px;
            overflow: hidden;
            background: #3a3952;
            transition: all 0.2s;
            position: relative;
        `;

        // Imagem e Nome
        card.innerHTML = `
            <div style="height: 160px; overflow: hidden;">
                <img src="${figure.urlFoto || '/img/placeholder.png'}" 
                     alt="${figure.nome}"
                     style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div style="padding: 8px; text-align: center;">
                <p style="margin:0; font-size: 13px; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                    ${figure.nome}
                </p>
                <p style="margin:2px 0 0 0; font-size: 11px; color: #bbb;">${figure.categoria}</p>
            </div>
            ${isSelected ? '<div style="position:absolute; top:5px; right:5px; background:#d682ff; color:white; border-radius:50%; width:20px; height:20px; text-align:center; font-size:12px;">✓</div>' : ''}
        `;
        
        // Clique para selecionar/desselecionar
        card.addEventListener('click', () => toggleSelection(figure, card));
        
        grid.appendChild(card);
    });
}

function toggleSelection(figure, card) {
    const index = selectedFigures.findIndex(f => f.id === figure.id);
    
    if (index > -1) {
        // Remover
        selectedFigures.splice(index, 1);
        card.style.border = '3px solid transparent';
        card.querySelector('div[style*="position:absolute"]')?.remove(); // Remove o check
    } else {
        // Adicionar
        selectedFigures.push(figure);
        card.style.border = '3px solid #d682ff';
        // Adiciona o check visualmente
        card.insertAdjacentHTML('beforeend', '<div style="position:absolute; top:5px; right:5px; background:#d682ff; color:white; border-radius:50%; width:20px; height:20px; text-align:center; font-size:12px;">✓</div>');
    }
}

async function handleSubmit(e) {
    e.preventDefault();
    
    const title = document.getElementById('collection-title').value;
    const description = document.getElementById('collection-description').value;
    const btnSave = document.querySelector('.btn-save');

    if (selectedFigures.length === 0) {
        alert('Selecione pelo menos uma figure para sua coleção!');
        return;
    }

    btnSave.textContent = 'Salvando...';
    btnSave.disabled = true;

    try {
        // 1. Cria a Coleção
        const novaColecao = await ColecaoAPI.criar({
            nome: title,
            descricao: description,
            visibilidade: 'PUBLICA',
            colecionadorId: usuarioLogadoId // ID real do usuário
        });

        // 2. Adiciona os itens selecionados
        // Fazemos em loop (ou poderia ser um endpoint de lote se o backend suportar)
        for (const figure of selectedFigures) {
            await ItemColecaoAPI.adicionar(novaColecao.id, figure.id, {
                estado: 'Novo', // Valor padrão
                favorito: false
            });
        }

        alert('Coleção criada com sucesso!');
        window.location.href = '/dashboard'; // Volta pro painel

    } catch (error) {
        console.error(error);
        alert('Erro ao salvar coleção: ' + error.message);
        btnSave.textContent = 'Salvar Coleção';
        btnSave.disabled = false;
    }
}