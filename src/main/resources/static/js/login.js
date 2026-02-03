// login.js - Autenticação de usuários

class LoginManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkExistingSession();
    }

    setupEventListeners() {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        // Toggle password visibility
        const togglePassword = document.getElementById('toggle-password');
        const passwordInput = document.getElementById('password');
        
        if (togglePassword && passwordInput) {
            togglePassword.addEventListener('click', () => {
                const type = passwordInput.type === 'password' ? 'text' : 'password';
                passwordInput.type = type;
                togglePassword.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
            });
        }
    }

    checkExistingSession() {
        const token = localStorage.getItem('authToken');
        const user = localStorage.getItem('user');
        
        if (token && user) {
            // Redirecionar para o dashboard se já estiver logado
            window.location.href = '/dashboard';
        }
    }

    async handleLogin() {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('error-message');
        const submitButton = document.getElementById('submit-btn');

        if (!username || !password) {
            this.showError('Por favor, preencha todos os campos.');
            return;
        }

        // Desabilitar botão e mostrar loading
        submitButton.disabled = true;
        submitButton.textContent = 'Entrando...';

        try {
            const response = await fetch('/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    senha: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Login successful
                localStorage.setItem('authToken', data.token || 'dummy-token');
                localStorage.setItem('user', JSON.stringify({
                    id: data.id,
                    username: data.username,
                    email: data.email
                }));

                this.showSuccess('Login realizado com sucesso!');
                
                // Redirecionar para dashboard
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 1000);
            } else {
                // Login failed
                this.showError(data.message || 'Usuário ou senha incorretos.');
            }
        } catch (error) {
            console.error('Erro no login:', error);
            this.showError('Erro de conexão. Tente novamente mais tarde.');
        } finally {
            // Reabilitar botão
            submitButton.disabled = false;
            submitButton.textContent = 'Entrar';
        }
    }

    showError(message) {
        const errorElement = document.getElementById('error-message');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            
            // Esconder após 5 segundos
            setTimeout(() => {
                errorElement.style.display = 'none';
            }, 5000);
        }
    }

    showSuccess(message) {
        const successElement = document.getElementById('success-message');
        if (successElement) {
            successElement.textContent = message;
            successElement.style.display = 'block';
        }
    }

    // Função de logout
    static logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
    }
}

// Função para verificar se usuário está autenticado
function isAuthenticated() {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    return !!(token && user);
}

// Função para obter dados do usuário logado
function getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

// Função para redirecionar se não estiver autenticado
function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = '/login';
        return false;
    }
    return true;
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new LoginManager();
});

// Exportar funções para uso em outras páginas
window.LoginManager = LoginManager;
window.isAuthenticated = isAuthenticated;
window.getCurrentUser = getCurrentUser;
window.requireAuth = requireAuth;
