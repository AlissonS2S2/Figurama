document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const dados = {
        // Altere os IDs conforme seu HTML (username ou email)
        nomeUsuario: document.getElementById('username').value,
        senha: document.getElementById('password').value
    };

    try {
        const response = await fetch(`${CONFIG.API_BASE_URL}/usuarios/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        if (response.ok) {
            const usuarioLogado = await response.json();
            // Salva os dados no navegador
            localStorage.setItem('user', JSON.stringify(usuarioLogado));
            localStorage.setItem('token', 'fake-token-por-enquanto'); // Se não usar JWT
            
            window.location.href = 'dashboard.html';
        } else {
            alert("Usuário ou senha inválidos.");
        }
    } catch (error) {
        alert("Erro ao conectar com o servidor.");
    }
});