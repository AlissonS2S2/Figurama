document.getElementById('register-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const senha = document.getElementById('senha').value;
    const confirmar = document.getElementById('confirmar-senha').value;

    if (senha !== confirmar) {
        alert("As senhas não coincidem!");
        return;
    }

    const dados = {
        email: document.getElementById('email').value,
        nomeUsuario: document.getElementById('username').value,
        senha: senha
    };

    try {
        await AuthAPI.registrar(dados);
        alert("Conta criada com sucesso!");
        window.location.href = 'login.html';
    } catch (error) {
        alert(error.message);
    }
});