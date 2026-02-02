// static/js/action_figure.js

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const figureId = urlParams.get('id');

    if (!figureId) {
        window.location.href = '/index.html';
        return;
    }

    await carregarDetalhesFigura(figureId);
});

async function carregarDetalhesFigura(id) {
    try {
        const response = await fetch(`${CONFIG.API_BASE_URL}/catalogo/${id}`);
        const fig = await response.json();

        // Preenche dados principais
        document.getElementById('figure-name').textContent = fig.nome;
        document.getElementById('figure-img').src = fig.urlFoto || '/img/placeholder.png';
        document.getElementById('figure-description').textContent = fig.descricao || "Sem descrição disponível.";
        document.getElementById('figure-year').textContent = fig.dataLancamento ? new Date(fig.dataLancamento).getFullYear() : "N/A";
        document.getElementById('franchise-name').textContent = fig.franquia;
        document.getElementById('category-tag').textContent = fig.categoria;

        // Se estiver logado, configura o botão de adicionar
        configurarBotaoAdicionar(fig.id);

        // Carrega as seções de baixo
        carregarMesmaFranquia(fig.franquia, fig.id);
        carregarRelacionados(fig.categoria, fig.id);

    } catch (error) {
        console.error("Erro ao carregar figura:", error);
    }
}

// Busca figuras da mesma franquia usando o endpoint de pesquisa
async function carregarMesmaFranquia(franquia, idAtual) {
    const container = document.getElementById('franchise-grid');
    try {
        const response = await fetch(`${CONFIG.API_BASE_URL}/catalogo/pesquisar?nome=${franquia}`);
        const figures = await response.json();
        // Filtra para não mostrar a própria figura que já está aberta
        renderizarGrid(container, figures.filter(f => f.id !== idAtual));
    } catch (e) { console.error(e); }
}

// Busca figuras da mesma categoria
async function carregarRelacionados(categoria, idAtual) {
    const container = document.getElementById('related-grid');
    try {
        const response = await fetch(`${CONFIG.API_BASE_URL}/catalogo/pesquisar?nome=${categoria}`);
        const figures = await response.json();
        renderizarGrid(container, figures.filter(f => f.id !== idAtual));
    } catch (e) { console.error(e); }
}

function renderizarGrid(container, lista) {
    container.innerHTML = '';
    if (lista.length === 0) {
        container.innerHTML = '<p>Nenhuma outra figura encontrada.</p>';
        return;
    }
    lista.slice(0, 5).forEach(fig => {
        const card = document.createElement('div');
        card.className = 'mini-card';
        card.innerHTML = `
            <img src="${fig.urlFoto}" alt="${fig.nome}">
            <p>${fig.nome}</p>
        `;
        card.onclick = () => window.location.href = `action_figure.html?id=${fig.id}`;
        container.appendChild(card);
    });
}

// Lógica para usuários logados adicionarem à coleção
function configurarBotaoAdicionar(figureId) {
    const btnArea = document.getElementById('add-to-collection-area');
    
    if (!auth.isAuthenticated()) {
        btnArea.innerHTML = '<p><a href="login.html">Faça login</a> para adicionar à sua coleção.</p>';
        return;
    }

    btnArea.innerHTML = `
        <button id="btn-show-collections" class="btn-primary">Adicionar à Coleção</button>
        <div id="collections-dropdown" style="display:none; margin-top:10px;">
            <select id="select-colecao"></select>
            <button id="btn-confirm-add">Confirmar</button>
        </div>
    `;

    const btnShow = document.getElementById('btn-show-collections');
    const dropdown = document.getElementById('collections-dropdown');

    btnShow.onclick = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const resp = await fetch(`${CONFIG.API_BASE_URL}/colecoes/usuario/${user.id}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const colecoes = await resp.json();

        const select = document.getElementById('select-colecao');
        select.innerHTML = colecoes.map(c => `<option value="${c.id}">${c.nome}</option>`).join('');
        dropdown.style.display = 'block';
    };

    document.getElementById('btn-confirm-add').onclick = async () => {
        const colecaoId = document.getElementById('select-colecao').value;
        try {
            await fetch(`${CONFIG.API_BASE_URL}/colecoes/${colecaoId}/itens`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ actionFigureId: figureId })
            });
            alert("Figura adicionada com sucesso!");
            dropdown.style.display = 'none';
        } catch (e) { alert("Erro ao adicionar."); }
    };
}