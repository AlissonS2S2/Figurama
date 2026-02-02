document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm?.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Usando os IDs que você confirmou
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/usuarios/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const result = await response.json();

            if (response.ok && result.sucesso) {
                localStorage.setItem('token', result.data.token);
                localStorage.setItem('user', JSON.stringify(result.data.usuario));
                window.location.href = '/pages/dashboard.html';
            } else {
                alert(result.mensagem || "Usuário ou senha incorretos.");
            }
        } catch (error) {
            console.error("Erro no login:", error);
            alert("Erro ao conectar com o servidor.");
        }
    });
});