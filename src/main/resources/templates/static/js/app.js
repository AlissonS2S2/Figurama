const API_URL = 'http://localhost:8080/api';

// Funções de Tabs
function openTab(tabName, event) {
    const tabs = document.querySelectorAll('.tab-content');
    const btns = document.querySelectorAll('.tab-btn');

    tabs.forEach(tab => tab.classList.remove('active'));
    btns.forEach(btn => btn.classList.remove('active'));

    const targetTab = document.getElementById(tabName);
    if (targetTab) targetTab.classList.add('active');
    if (event && event.target) event.target.classList.add('active');

    if (tabName === 'dashboard') {
        carregarDashboard();
    }
}

// Funções de Alerta
function showAlert(containerId, message, type = 'success') {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
    setTimeout(() => container.innerHTML = '', 5000);
}

// ========== COLEÇÕES ==========
async function cadastrarColecao(event) {
    event.preventDefault();

    const colecao = {
        nome: document.getElementById('colecaoNome').value,
        descricao: document.getElementById('colecaoDescricao').value,
        visibilidade: document.getElementById('colecaoVisibilidade').value,
        colecionadorId: parseInt(document.getElementById('colecionadorId').value)
    };

    try {
        const response = await fetch(`${API_URL}/colecoes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(colecao)
        });

        if (response.ok) {
            showAlert('alertColecoes', '✅ Coleção cadastrada com sucesso!', 'success');
            const form = document.getElementById('formColecao');
            if (form) form.reset();
            listarColecoes();
        } else {
            showAlert('alertColecoes', '❌ Erro ao cadastrar coleção', 'error');
        }
    } catch (error) {
        showAlert('alertColecoes', '❌ Erro de conexão com o servidor', 'error');
        console.error(error);
    }
}

async function listarColecoes() {
    const container = document.getElementById('listaColecoes');
    if (!container) return;
    container.innerHTML = '<div class="loading">Carregando...</div>';

    try {
        const response = await fetch(`${API_URL}/colecoes`);
        const colecoes = await response.json();

        if (!Array.isArray(colecoes) || colecoes.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>Nenhuma coleção cadastrada ainda</p></div>';
            return;
        }

        container.innerHTML = colecoes.map(col => `
            <div class="item-card">
                <h3>${col.nome}</h3>
                <p><strong>ID:</strong> ${col.id}</p>
                <p>${col.descricao || 'Sem descrição'}</p>
                <p><strong>Colecionador ID:</strong> ${col.colecionadorId}</p>
                <span class="badge ${col.visibilidade === 'PUBLICA' ? 'badge-public' : 'badge-private'}">
                    ${col.visibilidade}
                </span>
                <div class="actions">
                    <button class="btn btn-danger" onclick="deletarColecao(${col.id})">🗑️ Deletar</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        container.innerHTML = '<div class="empty-state"><p>Erro ao carregar coleções</p></div>';
        console.error(error);
    }
}

async function listarColecoesPublicas() {
    const container = document.getElementById('listaColecoes');
    if (!container) return;
    container.innerHTML = '<div class="loading">Carregando...</div>';

    try {
        const response = await fetch(`${API_URL}/colecoes/publicas`);
        const colecoes = await response.json();

        if (!Array.isArray(colecoes) || colecoes.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>Nenhuma coleção pública encontrada</p></div>';
            return;
        }

        container.innerHTML = colecoes.map(col => `
            <div class="item-card">
                <h3>${col.nome}</h3>
                <p><strong>ID:</strong> ${col.id}</p>
                <p>${col.descricao || 'Sem descrição'}</p>
                <span class="badge badge-public">PÚBLICA</span>
            </div>
        `).join('');
    } catch (error) {
        container.innerHTML = '<div class="empty-state"><p>Erro ao carregar coleções públicas</p></div>';
        console.error(error);
    }
}

async function deletarColecao(id) {
    if (!confirm('Tem certeza que deseja deletar esta coleção?')) return;

    try {
        const response = await fetch(`${API_URL}/colecoes/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showAlert('alertColecoes', '✅ Coleção deletada com sucesso!', 'success');
            listarColecoes();
        } else {
            showAlert('alertColecoes', '❌ Erro ao deletar coleção', 'error');
        }
    } catch (error) {
        showAlert('alertColecoes', '❌ Erro de conexão com o servidor', 'error');
        console.error(error);
    }
}

// ========== ACTION FIGURES ==========
async function cadastrarActionFigure(event) {
    event.preventDefault();

    const actionFigure = {
        nome: document.getElementById('afNome').value,
        descricao: document.getElementById('afDescricao').value,
        categoria: document.getElementById('afCategoria').value,
        urlFoto: document.getElementById('afUrlFoto').value,
        preco: parseFloat(document.getElementById('afPreco').value) || null,
        fabricante: document.getElementById('afFabricante').value
    };

    try {
        const response = await fetch(`${API_URL}/action-figures`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(actionFigure)
        });

        if (response.ok) {
            showAlert('alertActionFigures', '✅ Action Figure cadastrada com sucesso!', 'success');
            const form = document.getElementById('formActionFigure');
            if (form) form.reset();
            listarActionFigures();
        } else {
            showAlert('alertActionFigures', '❌ Erro ao cadastrar action figure', 'error');
        }
    } catch (error) {
        showAlert('alertActionFigures', '❌ Erro de conexão com o servidor', 'error');
        console.error(error);
    }
}

async function listarActionFigures() {
    const container = document.getElementById('listaActionFigures');
    if (!container) return;
    container.innerHTML = '<div class="loading">Carregando...</div>';

    try {
        const response = await fetch(`${API_URL}/action-figures`);
        const figures = await response.json();

        if (!Array.isArray(figures) || figures.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>Nenhuma action figure cadastrada ainda</p></div>';
            return;
        }

        container.innerHTML = figures.map(af => `
            <div class="item-card">
                <h3>${af.nome}</h3>
                <p><strong>ID:</strong> ${af.id}</p>
                <p>${af.descricao || 'Sem descrição'}</p>
                <p><strong>Fabricante:</strong> ${af.fabricante || 'N/A'}</p>
                <p><strong>Preço:</strong> ${af.preco ? 'R$ ' + af.preco.toFixed(2) : 'N/A'}</p>
                <span class="badge badge-category">${af.categoria}</span>
                <div class="actions">
                    <button class="btn btn-danger" onclick="deletarActionFigure(${af.id})">🗑️ Deletar</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        container.innerHTML = '<div class="empty-state"><p>Erro ao carregar action figures</p></div>';
        console.error(error);
    }
}

async function filtrarPorCategoria() {
    const categoria = document.getElementById('filtroCategoria').value;
    if (!categoria) {
        listarActionFigures();
        return;
    }

    const container = document.getElementById('listaActionFigures');
    if (!container) return;
    container.innerHTML = '<div class="loading">Carregando...</div>';

    try {
        const response = await fetch(`${API_URL}/action-figures/categoria/${encodeURIComponent(categoria)}`);
        const figures = await response.json();

        if (!Array.isArray(figures) || figures.length === 0) {
            container.innerHTML = `<div class="empty-state"><p>Nenhuma action figure encontrada na categoria "${categoria}"</p></div>`;
            return;
        }

        container.innerHTML = figures.map(af => `
            <div class="item-card">
                <h3>${af.nome}</h3>
                <p><strong>ID:</strong> ${af.id}</p>
                <p>${af.descricao || 'Sem descrição'}</p>
                <p><strong>Fabricante:</strong> ${af.fabricante || 'N/A'}</p>
                <p><strong>Preço:</strong> ${af.preco ? 'R$ ' + af.preco.toFixed(2) : 'N/A'}</p>
                <span class="badge badge-category">${af.categoria}</span>
                <div class="actions">
                    <button class="btn btn-danger" onclick="deletarActionFigure(${af.id})">🗑️ Deletar</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        container.innerHTML = '<div class="empty-state"><p>Erro ao buscar action figures</p></div>';
        console.error(error);
    }
}

async function deletarActionFigure(id) {
    if (!confirm('Tem certeza que deseja deletar esta action figure?')) return;

    try {
        const response = await fetch(`${API_URL}/action-figures/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showAlert('alertActionFigures', '✅ Action Figure deletada com sucesso!', 'success');
            listarActionFigures();
        } else {
            showAlert('alertActionFigures', '❌ Erro ao deletar action figure', 'error');
        }
    } catch (error) {
        showAlert('alertActionFigures', '❌ Erro de conexão com o servidor', 'error');
        console.error(error);
    }
}

// ========== DASHBOARD ==========
async function carregarDashboard() {
    try {
        const [colecoes, actionFigures, publicas] = await Promise.all([
            fetch(`${API_URL}/colecoes`).then(r => r.json()),
            fetch(`${API_URL}/action-figures`).then(r => r.json()),
            fetch(`${API_URL}/colecoes/publicas`).then(r => r.json())
        ]);

        const totalColecoesEl = document.getElementById('totalColecoes');
        const totalActionFiguresEl = document.getElementById('totalActionFigures');
        const colecoesPublicasEl = document.getElementById('colecoesPublicas');

        if (totalColecoesEl) totalColecoesEl.textContent = Array.isArray(colecoes) ? colecoes.length : 0;
        if (totalActionFiguresEl) totalActionFiguresEl.textContent = Array.isArray(actionFigures) ? actionFigures.length : 0;
        if (colecoesPublicasEl) colecoesPublicasEl.textContent = Array.isArray(publicas) ? publicas.length : 0;

        const recentes = Array.isArray(colecoes) ? colecoes.slice(-3).reverse() : [];
        const container = document.getElementById('colecoesRecentes');
        if (!container) return;

        if (recentes.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>Nenhuma coleção cadastrada</p></div>';
            return;
        }

        container.innerHTML = recentes.map(col => `
            <div class="item-card">
                <h3>${col.nome}</h3>
                <p>${col.descricao || 'Sem descrição'}</p>
                <span class="badge ${col.visibilidade === 'PUBLICA' ? 'badge-public' : 'badge-private'}">
                    ${col.visibilidade}
                </span>
            </div>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar dashboard:', error);
    }
}

// Carregar dados iniciais
window.addEventListener('load', () => {
    listarColecoes();
    listarActionFigures();
});