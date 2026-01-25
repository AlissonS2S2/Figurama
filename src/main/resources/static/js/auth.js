// ============================================
// AUTH.JS - SISTEMA DE AUTENTICAÇÃO
// ============================================

// ============================================
// REGISTRO DE NOVO USUÁRIO
// ============================================

// Validação do formulário de registro
function validateRegisterForm() {
    const email = document.getElementById('email')?.value.trim();
    const username = document.getElementById('username')?.value.trim();
    const password = document.getElementById('password')?.value;
    const confirmPassword = document.getElementById('confirm-password')?.value;
    const terms = document.getElementById('terms')?.checked;
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('E-mail inválido');
        return false;
    }
    
    if (!username || username.length < 3 || username.length > 16) {
        alert('Nome de usuário deve ter entre 3 e 16 caracteres');
        return false;
    }
    
    if (!password || password.length < 6) {
        alert('Senha deve ter no mínimo 6 caracteres');
        return false;
    }
    
    if (password !== confirmPassword) {
        alert('As senhas não coincidem');
        return false;
    }
    
    if (!terms) {
        alert('Você deve aceitar os Termos de Serviço');
        return false;
    }
    
    return true;
}

// Enviar registro para o backend
async function handleRegister(event) {
    event.preventDefault();
    
    if (!validateRegisterForm()) return;
    
    const btn = document.querySelector('.btn-register');
    const originalText = btn.textContent;
    btn.textContent = 'Registrando...';
    btn.disabled = true;
    
    const userData = {
        email: document.getElementById('email').value.trim(),
        username: document.getElementById('username').value.trim(),
        password: document.getElementById('password').value
    };
    
    try {
        // NOTA: Este endpoint precisa ser criado no backend
        // Por enquanto, vamos simular sucesso
        
        // const response = await fetch(`${CONFIG.API_BASE_URL}/usuarios/registrar`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(userData)
        // });
        
        // const data = await handleResponse(response);
        
        // SIMULAÇÃO (remover quando o backend estiver pronto)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simular usuário criado
        const mockUser = {
            id: Math.floor(Math.random() * 1000),
            username: userData.username,
            email: userData.email
        };
        
        // Salvar no localStorage (temporário)
        localStorage.setItem('currentUser', JSON.stringify(mockUser));
        
        alert('Conta criada com sucesso!');
        window.location.href = 'login.html';
        
    } catch (error) {
        console.error('Erro ao registrar:', error);
        alert(error.message || 'Erro ao criar conta');
    } finally {
        btn.textContent = originalText;
        btn.disabled = false;
    }
}

// ============================================
// LOGIN DE USUÁRIO
// ============================================

// Validação do formulário de login
function validateLoginForm() {
    const username = document.getElementById('username')?.value.trim();
    const password = document.getElementById('password')?.value;
    
    if (!username) {
        showError('Por favor, insira seu nome de usuário ou e-mail');
        return false;
    }
    
    if (!password) {
        showError('Por favor, insira sua senha');
        return false;
    }
    
    if (password.length < 6) {
        showError('A senha deve ter pelo menos 6 caracteres');
        return false;
    }
    
    return true;
}

// Mostrar mensagem de erro
function showError(message) {
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    } else {
        alert(message);
    }
}

// Enviar login para o backend
async function handleLogin(event) {
    event.preventDefault();
    
    // Limpar erro anterior
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
    
    if (!validateLoginForm()) return;
    
    const btn = document.getElementById('btn-login');
    const originalText = btn.textContent;
    btn.textContent = 'Entrando...';
    btn.disabled = true;
    
    const credentials = {
        username: document.getElementById('username').value.trim(),
        password: document.getElementById('password').value
    };
    
    try {
        // NOTA: Este endpoint precisa ser criado no backend
        // Por enquanto, vamos simular sucesso
        
        // const response = await fetch(`${CONFIG.API_BASE_URL}/usuarios/login`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(credentials)
        // });
        
        // const data = await handleResponse(response);
        
        // SIMULAÇÃO (remover quando o backend estiver pronto)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simular usuário logado
        const mockUser = {
            id: 1,
            username: credentials.username,
            email: credentials.username + '@example.com',
            token: 'mock-jwt-token-' + Date.now()
        };
        
        // Salvar no localStorage
        localStorage.setItem('currentUser', JSON.stringify(mockUser));
        localStorage.setItem('authToken', mockUser.token);
        
        // Remember me
        const rememberCheckbox = document.getElementById('remember');
        if (rememberCheckbox?.checked) {
            localStorage.setItem('rememberUser', credentials.username);
        } else {
            localStorage.removeItem('rememberUser');
        }
        
        alert('Login realizado com sucesso!');
        window.location.href = 'dashboard.html';
        
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        showError(error.message || 'Usuário ou senha incorretos');
    } finally {
        btn.textContent = originalText;
        btn.disabled = false;
    }
}

// ============================================
// LOGOUT
// ============================================

function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    window.location.href = 'index.html';
}

// ============================================
// VERIFICAR SE ESTÁ LOGADO
// ============================================

function isLoggedIn() {
    return localStorage.getItem('currentUser') !== null;
}

function getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
}

// Redirecionar se não estiver logado (para páginas protegidas)
function requireAuth() {
    if (!isLoggedIn()) {
        alert('Você precisa fazer login para acessar esta página');
        window.location.href = 'login.html';
    }
}

// ============================================
// TOGGLE PASSWORD VISIBILITY
// ============================================

function setupPasswordToggle() {
    const toggleBtn = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');
    
    if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener('click', () => {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            toggleBtn.textContent = type === 'password' ? '👁️' : '🙈';
        });
    }
}

// ============================================
// CARREGAR REMEMBER ME
// ============================================

function loadRememberedUser() {
    const rememberedUser = localStorage.getItem('rememberUser');
    const usernameInput = document.getElementById('username');
    const rememberCheckbox = document.getElementById('remember');
    
    if (rememberedUser && usernameInput) {
        usernameInput.value = rememberedUser;
        if (rememberCheckbox) {
            rememberCheckbox.checked = true;
        }
    }
}

// ============================================
// INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    
    // Página de Registro
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Página de Login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
        setupPasswordToggle();
        loadRememberedUser();
    }
    
    // Verificar se está em página protegida
    const protectedPages = ['dashboard.html', 'criando_colecao.html', 'minha_colecao.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage)) {
        requireAuth();
        
        // Atualizar nome do usuário no header
        const user = getCurrentUser();
        if (user) {
            const nomeUsuario = document.querySelector('.nome-usuario');
            if (nomeUsuario) {
                nomeUsuario.textContent = user.username;
            }
        }
    }
});

// Exportar funções globalmente
window.logout = logout;
window.isLoggedIn = isLoggedIn;
window.getCurrentUser = getCurrentUser;
window.requireAuth = requireAuth;