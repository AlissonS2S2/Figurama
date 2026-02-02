async function carregarDashboard() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;

    // Atualiza nome de boas-vindas
    const welcomeSpan = document.getElementById('username');
    if (welcomeSpan) welcomeSpan.textContent = user.nome || user.username;

    try {
        // 1. Carregar Estatísticas (Endpoint: /api/usuarios/{id}/estatisticas)
        const resStats = await fetch(`${CONFIG.API_BASE_URL}/usuarios/${user.id}/estatisticas`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const stats = await resStats.json();
        
        document.getElementById('total-figures').textContent = stats.totalFiguras || 0;
        document.getElementById('total-collections').textContent = stats.totalColecoes || 0;

        // 2. Carregar Coleções do Usuário (Endpoint: /api/colecoes/usuario/{id})
        const resCol = await fetch(`${CONFIG.API_BASE_URL}/colecoes/usuario/${user.id}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const colecoes = await resCol.json();
        
        const container = document.getElementById('collections-container');
        if (container) {
            container.innerHTML = '';
            if (colecoes.length === 0) {
                container.innerHTML = '<p>Você ainda não tem coleções.</p>';
            } else {
                colecoes.forEach(col => {
                    const colCard = document.createElement('div');
                    colCard.className = 'collection-card';
                    colCard.innerHTML = `
                        <h3>${col.nome}</h3>
                        <p>${col.descricao || 'Sem descrição'}</p>
                        <small>${col.figuras ? col.figuras.length : 0} figuras</small>
                    `;
                    colCard.onclick = () => window.location.href = `/pages/minha_colecao.html?id=${col.id}`;
                    container.appendChild(colCard);
                });
            }
        }
    } catch (error) {
        console.error("Erro ao carregar Dashboard:", error);
    }
}

document.addEventListener('DOMContentLoaded', carregarDashboard);