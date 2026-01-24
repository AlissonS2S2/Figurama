document.addEventListener("DOMContentLoaded", () => {

    // ==========================
    // NOVIDADES
    // ==========================
    const grid = document.getElementById("novidadesGrid");

    buscarNovidades().then(novidades => {
        novidades.forEach((figura, index) => {
            const card = document.createElement("div");
            card.className = "card";
            card.textContent = figura.nome;

            card.style.animationDelay = `${index * 0.1}s`;

            card.addEventListener("click", () => {
                alert(`Figura selecionada: ${figura.nome}`);
            });

            grid.appendChild(card);
        });
    });

    // ==========================
    // NAVEGAÇÃO
    // ==========================
    document.getElementById("exploreBtn").addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector(".novidades")
            .scrollIntoView({ behavior: "smooth" });
    });

    document.getElementById("startBtn").addEventListener("click", () => {
        alert("Bem-vindo ao Figurama! Crie sua conta para começar.");
    });

    // ==========================
    // PESQUISA
    // ==========================
    document.querySelector(".search-box input")
        .addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                const termo = e.target.value.trim();
                if (termo) {
                    alert(`Buscando por: ${termo}`);
                }
            }
        });
});
