// ============================================
// AUTH.JS - SISTEMA DE AUTENTICAÇÃO INTEGRADO
// ============================================

// ============================================
// REGISTRO DE NOVO USUÁRIO
// ============================================

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
        const response = await fetch(`${CONFIG.API_BASE_URL}/usuarios/registrar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        
        const data = await response.json();
        
        if (data.sucesso) {
            alert('Conta criada com sucesso!');
            window.location.href = 'login.html';
        } else {
            alert(data.mensagem || 'Erro ao criar conta');
        }
        
    } catch (error) {
        console.error('Erro ao registrar:', error);
        alert('Erro ao conectar com o servidor');
    } finally {
        btn.textContent = originalText;
        btn.disabled = false;
    }
}

// ============================================
// LOGIN DE USUÁRIO
// ============================================

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

async function handleLogin(event) {
    event.preventDefault();
    
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
        const response = await fetch(`${CONFIG.API_BASE_URL}/usuarios/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        
        const data = await response.json();
        
        if (data.sucesso) {
            // Salvar dados do usuário
            localStorage.setItem('currentUser', JSON.stringify(data.data.usuario));
            localStorage.setItem('authToken', data.data.token);
            
            // Remember me
            const rememberCheckbox = document.getElementById('remember');
            if (rememberCheckbox?.checked) {
                localStorage.setItem('rememberUser', credentials.username);
            } else {
                localStorage.removeItem('rememberUser');
            }
            
            alert('Login realizado com sucesso!');
            window.location.href = 'dashboard.html';
            
        } else {
            showError(data.mensagem || 'Usuário ou senha incorretos');
        }
        
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        showError('Erro ao conectar com o servidor');
    } finally {
        btn.textContent = originalText;
        btn.disabled = false;
    }
}

// ============================================
// LOGOUT
// ============================================

function logout() {
    if (confirm('Deseja realmente sair?')) {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authToken');
        alert('Você saiu do sistema');
        window.location.href = '../index.html';
    }
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

function requireAuth() {
    if (!isLoggedIn()) {
        alert('Você precisa fazer login para acessar esta página');
        window.location.href = 'login.html';
    }
}

// ============================================
// ATUALIZAR NOME DO USUÁRIO NO HEADER
// ============================================

function updateUserHeader() {
    const user = getCurrentUser();
    if (user) {
        // Atualizar nome do usuário em todos os locais
        const nomeUsuarioElements = document.querySelectorAll('.nome-usuario');
        nomeUsuarioElements.forEach(el => {
            el.textContent = user.username;
        });
        
        // Atualizar mensagem de boas-vindas se existir
        const welcomeMsg = document.querySelector('.wb');
        if (welcomeMsg) {
            welcomeMsg.textContent = `Bem-vindo de volta ${user.username}, suas coleções te esperam...`;
        }
    }
}

// ============================================
// ADICIONAR BOTÃO DE LOGOUT
// ============================================

function addLogoutButton() {
    const nav = document.querySelector('.nav-logged');
    if (nav && !document.getElementById('logout-btn')) {
        const logoutBtn = document.createElement('button');
        logoutBtn.id = 'logout-btn';
        logoutBtn.className = 'btn-logout';
        logoutBtn.textContent = 'Sair';
        logoutBtn.style.cssText = `
            background: #ff6b6b;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            color: white;
            cursor: pointer;
            font-size: 14px;
            margin-left: 10px;
        `;
        logoutBtn.addEventListener('click', logout);
        nav.appendChild(logoutBtn);
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
    const protectedPages = ['dashboard.html', 'criando_colecao.html', 'minha_colecao.html', 'action_figure.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage)) {
        requireAuth();
        updateUserHeader();
        addLogoutButton();
    }
    
    // Adicionar botão de logout em todas as páginas logadas
    if (isLoggedIn() && document.querySelector('.nav-logged')) {
        addLogoutButton();
        updateUserHeader();
    }
});

// Exportar funções globalmente
window.logout = logout;
window.isLoggedIn = isLoggedIn;
window.getCurrentUser = getCurrentUser;
window.requireAuth = requireAuth;
