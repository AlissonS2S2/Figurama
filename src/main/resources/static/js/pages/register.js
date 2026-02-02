// Script específico da página de registro
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('register-form');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = {
            nomeUsuario: document.getElementById('username').value,
            email: document.getElementById('email').value,
            senha: document.getElementById('password').value
        };
        
        // Validações básicas
        if (formData.senha !== document.getElementById('confirm-password').value) {
            alert('Senhas não coincidem!');
            return;
        }
        
        if (formData.senha.length < 6) {
            alert('Senha deve ter no mínimo 6 caracteres!');
            return;
        }
        
        if (!document.getElementById('terms').checked) {
            alert('Você deve aceitar os termos de serviço!');
            return;
        }
        
        try {
            // Envia para o backend
            const response = await AuthAPI.registrar(formData);
            alert('Usuário cadastrado com sucesso!');
            window.location.href = 'login.html';
        } catch (error) {
            alert('Erro ao cadastrar: ' + error.message);
        }
    });
});
