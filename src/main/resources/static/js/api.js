// MOCK - simula resposta do backend
function buscarNovidades() { //usado em index e script
    return Promise.resolve([
        { id: 1, nome: "Deadpool Figurama" },
        { id: 2, nome: "Batman Deluxe" },
        { id: 3, nome: "Spider-Man Premium" },
        { id: 4, nome: "Goku Limitado" },
        { id: 5, nome: "Iron Man Mark 50" },
        { id: 6, nome: "Kratos Collector" }
    ]);

    // FUTURO (Spring Boot):
    /*
    return fetch(`${CONFIG.API_BASE_URL}/figuras/novidades`)
        .then(res => res.json());
    */
}

function buscarPopulares() { //usado em index e script
    return Promise.resolve([
        { id: 7, nome: "Thor Ragnarok" },
        { id: 8, nome: "Wolverine Classic" },
        { id: 9, nome: "Hulk Smash" },
        { id: 10, nome: "Captain America" },
        { id: 11, nome: "Black Panther" },
        { id: 12, nome: "Darth Vader" }
    ]);

    // FUTURO (Spring Boot):
    /*
    return fetch(`${CONFIG.API_BASE_URL}/figuras/populares`)
        .then(res => res.json());
    */
}
