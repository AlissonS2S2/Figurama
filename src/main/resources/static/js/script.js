async function carregarLandingPage() {
    const novidadesGrid = document.getElementById('novidadesGrid');
    const popularGrid = document.getElementById('popularGrid');

    try {
        // Busca no catálogo do seu Back-end
        const response = await fetch(`${CONFIG.API_BASE_URL}/catalogo`);
        const figures = await response.json();

        if (novidadesGrid) {
            novidadesGrid.innerHTML = '';
            // Pega as últimas 6 figuras (Novidades)
            figures.slice(0, 6).forEach(fig => {
                novidadesGrid.appendChild(criarCardFigura(fig));
            });
        }

        if (popularGrid) {
            popularGrid.innerHTML = '';
            // Simula populares pegando outra fatia (ou a mesma se houver poucos)
            figures.slice(0, 6).forEach(fig => {
                popularGrid.appendChild(criarCardFigura(fig));
            });
        }
    } catch (error) {
        console.error("Erro ao carregar Landing Page:", error);
    }
}

function criarCardFigura(fig) {
    const card = document.createElement('div');
    card.className = 'card'; // Classe CSS que você já tem
    card.innerHTML = `
        <a href="/pages/action_figure.html?id=${fig.id}">
            <img src="${fig.urlFoto || '/img/placeholder.png'}" alt="${fig.nome}">
            <h3>${fig.nome}</h3>
            <p>${fig.franquia}</p>
        </a>
    `;
    return card;
}

document.addEventListener('DOMContentLoaded', carregarLandingPage);