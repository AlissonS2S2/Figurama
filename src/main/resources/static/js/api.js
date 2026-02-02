const AuthAPI = {
    async registrar(userData) {
        const response = await fetch(`${CONFIG.API_BASE_URL}/usuarios/registrar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || "Erro ao registrar");
        }
        return response.json();
    },

    async login(credentials) {
        // Nota: O Back-end precisa ter um endpoint de login que retorne os dados do usuário
        const response = await fetch(`${CONFIG.API_BASE_URL}/usuarios/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        if (!response.ok) throw new Error("Credenciais inválidas");
        return response.json();
    }
};