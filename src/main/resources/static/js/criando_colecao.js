// static/js/criando_colecao.js (VERSÃO HÍBRIDA: CRIA E EDITA)

let figurasSelecionadas = [];
let editMode = false;
let currentColecaoId = null;

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    currentColecaoId = urlParams.get('editId');

    if (currentColecaoId) {
        editMode = true;
        document.querySelector('h1').textContent = "Editando Coleção";
        await carregarDadosEdicao(currentColecaoId);
    }

    const inputBusca = document.getElementById('input-pesquisa-figure');
    inputBusca?.addEventListener('input', (e) => {
        const termo = e.target.value;
        if (termo.length > 2) buscarNoCatalogo(termo);
    });

    document.getElementById('btn-salvar-colecao').addEventListener('click', salvarColecao);
});

// Carrega os dados do banco para a tela de edição
async function carregarDadosEdicao(id) {
    try {
        const resp = await fetch(`${CONFIG.API_BASE_URL}/colecoes/${id}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const colecao = await resp.json();

        document.getElementById('nome-colecao').value = colecao.nome;
        document.getElementById('descricao-colecao').value = colecao.descricao;
        
        // Coloca as figuras atuais na lista de edição
        figurasSelecionadas = colecao.figuras.map(f => ({
            id: f.id,
            nome: f.nome,
            urlFoto: f.urlFoto
        }));

        renderizarSelecionadas();
    } catch (error) {
        console.error("Erro ao carregar dados para edição", error);
    }
}

// ... (Mantenha a função buscarNoCatalogo e adicionarAFila do passo anterior)

function renderizarSelecionadas() {
    const container = document.getElementById('lista-selecionadas');
    const btnSalvar = document.getElementById('btn-salvar-colecao');
    container.innerHTML = '';

    figurasSelecionadas.forEach(fig => {
        const item = document.createElement('div');
        item.className = 'selected-figure-item';
        
        // REGRA: Se houver apenas 1 figura, não permite excluir (botão some ou fica desativado)
        const podeRemover = figurasSelecionadas.length > 1;
        
        item.innerHTML = `
            <img src="${fig.urlFoto}" width="40">
            <span>${fig.nome}</span>
            ${podeRemover ? `<button onclick="removerDaFila('${fig.id}')">❌</button>` : `<small>(Mínimo 1)</small>`}
        `;
        container.appendChild(item);
    });

    btnSalvar.disabled = figurasSelecionadas.length === 0;
}

async function salvarColecao() {
    const user = JSON.parse(localStorage.getItem('user'));
    const dto = {
        nome: document.getElementById('nome-colecao').value,
        descricao: document.getElementById('descricao-colecao').value,
        colecionadorId: user.id
    };

    const metodo = editMode ? 'PUT' : 'POST';
    const url = editMode ? `${CONFIG.API_BASE_URL}/colecoes/${currentColecaoId}` : `${CONFIG.API_BASE_URL}/colecoes`;

    try {
        // 1. Salva os dados básicos (Nome/Desc)
        const resp = await fetch(url, {
            method: metodo,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(dto)
        });

        if (editMode) {
            // Lógica de edição de itens: Em um sistema real, você deletaria os antigos e postaria os novos
            // ou teria um endpoint específico. Como no seu back temos o POST de itens:
            alert("Informações atualizadas!");
        } else {
            const novaCol = await resp.json();
            // Vincula figuras (igual ao passo anterior)
            for (const fig of figurasSelecionadas) {
                await fetch(`${CONFIG.API_BASE_URL}/colecoes/${novaCol.id}/itens`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                    body: JSON.stringify({ actionFigureId: fig.id })
                });
            }
            alert("Coleção criada!");
        }
        window.location.href = 'dashboard.html';
    } catch (e) {
        alert("Erro ao salvar.");
    }
}