// js/script.js

// Função para criar o HTML do card seguindo o padrão do seu Java
function createFigureCard(figure) {
    const card = document.createElement('div');
    card.className = 'card';
    
    // fotoUrl e franquia são os nomes que estão no seu ActionFigureEntity.java
    card.innerHTML = `
        <div onclick="window.location.href='pages/action_figure.html?id=${figure.id}'" style="cursor:pointer">
            <img src="${figure.fotoUrl || 'images/placeholder.png'}" alt="${figure.nome}">
            <h3>${figure.nome}</h3>
            <p>${figure.franquia || 'Franquia não informada'}</p>
        </div>
    `;
    
    return card;
}

// Busca as 6 figuras mais recentes do Back-end
async function loadNovidades() {
    const grid = document.getElementById('novidadesGrid');
    if (!grid) return;

    try {
        const response = await fetch(`${window.CONFIG.API_BASE_URL}/action-figures/novidades`);
        const novidades = await response.json();
        
        grid.innerHTML = '';
        novidades.forEach(figure => {
            grid.appendChild(createFigureCard(figure));
        });
    } catch (error) {
        console.error('Erro ao carregar novidades:', error);
        grid.innerHTML = '<p>Erro ao conectar com o servidor.</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadNovidades();
});