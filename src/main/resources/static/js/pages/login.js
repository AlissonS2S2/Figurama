// Script específico da página de login
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const credentials = {
            email: document.getElementById('email').value,
            senha: document.getElementById('password').value
        };
        
        try {
            // Envia para o backend
            const user = await AuthAPI.login(credentials);
            
            // Salva no localStorage
            localStorage.setItem('token', 'fake-jwt-token'); // Em produção, usar token real
            localStorage.setItem('user', JSON.stringify(user));
            
            alert('Login realizado com sucesso!');
            window.location.href = '../index.html';
        } catch (error) {
            alert('Erro ao fazer login: ' + error.message);
        }
    });
});
