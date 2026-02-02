// static/js/minha_colecao.js

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const colecaoId = urlParams.get('id');

    if (!colecaoId) {
        window.location.href = 'dashboard.html';
        return;
    }

    try {
        const response = await fetch(`${CONFIG.API_BASE_URL}/colecoes/${colecaoId}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const colecao = await response.json();

        // Preenche os dados na tela
        document.getElementById('titulo-colecao').textContent = colecao.nome;
        document.getElementById('desc-colecao').textContent = colecao.descricao || "Sem descrição";
        document.getElementById('qtd-figures').textContent = `${colecao.figuras.length} Action Figures`;

        // Renderiza as figuras
        const grid = document.getElementById('grid-figures-colecao');
        grid.innerHTML = '';
        colecao.figuras.forEach(fig => {
            const card = document.createElement('div');
            card.className = 'figure-card-minha';
            card.innerHTML = `
                <img src="${fig.urlFoto}" alt="${fig.nome}">
                <p>${fig.nome}</p>
            `;
            grid.appendChild(card);
        });

        // Configura botão Editar
        document.getElementById('btn-editar-colecao').onclick = () => {
            window.location.href = `criando_colecao.html?editId=${colecaoId}`;
        };

        // Configura botão Excluir Coleção
        document.getElementById('btn-excluir-colecao').onclick = () => excluirColecao(colecaoId);

    } catch (error) {
        console.error("Erro ao carregar coleção:", error);
    }
});

async function excluirColecao(id) {
    if (!confirm("Tem certeza que deseja excluir toda esta coleção? Isso não pode ser desfeito.")) return;

    try {
        await fetch(`${CONFIG.API_BASE_URL}/colecoes/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        alert("Coleção removida!");
        window.location.href = 'dashboard.html';
    } catch (error) {
        alert("Erro ao excluir coleção.");
    }
}