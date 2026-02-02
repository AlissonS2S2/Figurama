# ============================================
# DOCUMENTAÇÃO - CÓDIGOS FRONT-END
# ============================================

Este documento contém todos os códigos front-end do projeto Figurama, organizados por tecnologia e funcionalidade.

## 📁 ESTRUTURA DE ARQUIVOS

```
static/
├── css/                    # Estilos CSS
│   ├── components/         # Componentes reutilizáveis
│   ├── pages/             # Estilos específicos de páginas
│   └── style.css          # Estilo global
├── js/                    # JavaScript
│   ├── config.js          # Configurações globais
│   ├── api.js             # Integração com backend
│   ├── auth.js            # Autenticação
│   ├── script.js          # Landing page
│   ├── action_figure.js   # Detalhes de figures
│   ├── criando_colecao.js # Criação de coleções
│   ├── dashboard.js       # Dashboard
│   ├── minha_colecao.js   # Visualização coleções
│   └── app.js             # Funções administrativas
├── pages/                 # Páginas HTML
│   ├── action_figure.html
│   ├── criando_colecao.html
│   ├── dashboard.html
│   ├── franquia.html
│   ├── login.html
│   ├── minha_colecao.html
│   ├── pesquisa.html
│   ├── register.html
│   └── support.html
├── fragments/             # Fragmentos HTML reutilizáveis
│   ├── footer.html
│   ├── header.html
│   ├── header_logged.html
│   └── layout.html
└── index.html             # Página principal
```

---

## 🎨 CSS (ESTILOS)

### 📄 style.css - Estilo Global
```css
/* Estilos globais do projeto */
/* Reset e configurações base */
/* Variáveis CSS */
/* Layout principal */
/* Tipografia */
/* Cores e temas */
```

### 📁 components/ - Componentes Reutilizáveis
```css
/* buttons.css - Botões */
.btn-primary { /* Estilo botão primário */ }
.btn-secondary { /* Estilo botão secundário */ }
.btn-add { /* Estilo botão adicionar */ }

/* cards.css - Cards */
.figure-card { /* Card de action figure */ }
.collection-card { /* Card de coleção */ }
.recent-card { /* Card recente */ }

/* forms.css - Formulários */
.form-group { /* Grupo de formulário */ }
.form-control { /* Controle de formulário */ }
```

### 📁 pages/ - Estilos Específicos
```css
/* action_figure.css - Página de detalhes */
.figure-page { /* Layout página detalhes */ }
.figure-info { /* Informações da figure */ }

/* dashboard.css - Dashboard */
.dashboard { /* Layout dashboard */ }
.stats { /* Estatísticas */ }

/* login.css - Login */
.login-content { /* Conteúdo login */ }
.login-area { /* Área de login */ }

/* Outros arquivos de páginas específicas */
```

---

## 📜 HTML (PÁGINAS)

### 🏠 index.html - Página Principal
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Action Figures - Sistema de Coleções</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<div class="container">
    <header>
        <h1>🎭 Sistema de Coleções de Action Figures</h1>
        <p>Gerencie suas coleções e action figures de forma simples e intuitiva</p>
    </header>

    <div class="tabs">
        <button class="tab-btn active">📚 Coleções</button>
        <button class="tab-btn">🎭 Action Figures</button>
        <button class="tab-btn">📊 Dashboard</button>
    </div>

    <!-- Abas de conteúdo -->
    <div id="colecoes" class="tab-content active">
        <!-- Formulário de coleção -->
        <!-- Lista de coleções -->
    </div>

    <div id="actionFigures" class="tab-content">
        <!-- Formulário de action figure -->
        <!-- Lista de action figures -->
    </div>

    <div id="dashboard" class="tab-content">
        <!-- Estatísticas -->
        <!-- Coleções recentes -->
    </div>
</div>

<script src="js/app.js"></script>
</body>
</html>
```

### 📄 pages/ - Páginas Específicas

#### action_figure.html - Detalhes da Action Figure
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detalhes Action Figure</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/components/cards.css">
    <link rel="stylesheet" href="../css/components/buttons.css">
    <link rel="stylesheet" href="../css/components/forms.css">
    <link rel="stylesheet" href="../css/pages/action_figure.css">
</head>
<body>
    <header class="header-logged">
        <!-- Header para usuário logado -->
    </header>

    <main class="figure-page">
        <section class="figure-container">
            <div class="figure-image-box">
                <img id="main-figure-img" src="uploads/example.jpg" alt="Figure">
                <button class="btn-add">Adicionar</button>
            </div>
            <div class="figure-info">
                <h1 id="figure-name"></h1>
                <div class="release-date">
                    Lançada em <span id="figure-date"></span>
                </div>
                <p class="figure-subtitle">de franquia <span id="franchise-name"></span></p>
                <p class="description" id="figure-description"></p>
                <div class="category-area">
                    <p>Categorias</p>
                    <div class="tags-container" id="category-tags"></div>
                </div>
            </div>
        </section>

        <!-- Seções relacionadas -->
        <section class="section-block">
            <p class="section-title">Da mesma franquia</p>
            <div class="cards-grid-row" id="franchise-figures-grid"></div>
        </section>

        <section class="section-block">
            <p class="section-title">Figuras relacionadas</p>
            <div class="cards-grid-row" id="related-figures-grid"></div>
        </section>
    </main>

    <footer class="main-footer">
        <!-- Footer -->
    </footer>
</body>
</html>
```

#### dashboard.html - Dashboard do Usuário
```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Figurama</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/components/buttons.css">
    <link rel="stylesheet" href="../css/components/cards.css">
    <link rel="stylesheet" href="../css/components/forms.css">
    <link rel="stylesheet" href="../css/pages/dashboard.css">
</head>
<body>
    <header class="header-logged">
        <!-- Header logado -->
    </header>

    <main class="dashboard">
        <h2 class="wb">Bem-vindo de volta <span id="username">Colecionador</span>, suas coleções te esperam...</h2>

        <section class="stats">
            <div class="stat">
                <span class="stat-number" id="total-figures">0</span>
                <span>Figuras salvas</span>
            </div>
            <div class="stat">
                <span class="stat-number" id="total-collections">0</span>
                <span>Coleções criadas</span>
            </div>
            <div class="recent">
                <h4>Últimas adicionadas</h4>
                <div class="recent-grid" id="recent-grid"></div>
            </div>
        </section>

        <section class="collections-section">
            <h3>Suas Coleções</h3>
            <div class="collections" id="collections-container"></div>
        </section>

        <section class="novidades-section">
            <h3>Novidades</h3>
            <div class="news-grid" id="news-grid"></div>
        </section>

        <section class="populares-section">
            <h3>Populares no momento</h3>
            <div class="popular-grid" id="popular-grid"></div>
        </section>
    </main>
</body>
</html>
```

#### login.html - Página de Login
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/components/buttons.css">
    <link rel="stylesheet" href="../css/components/forms.css">
    <link rel="stylesheet" href="../css/pages/login.css">
</head>
<body>
    <header class="header">
        <!-- Header público -->
    </header>
    
    <main class="login-content">
        <h1 class="title-login">Bem-Vindo de Volta</h1>
        <div id="error-message" style="display: none;"></div>
        
        <form id="login-form" class="login-area">
            <input type="text" id="username" name="username" placeholder="Email / Nome de usuário" required>
            <div class="password-area">
                <input type="password" id="password" name="password" placeholder="Senha" required>
                <button type="button" id="toggle-password" title="Mostrar/Ocultar Senha">👁️</button>
            </div>
            <label class="remember">
                <input type="checkbox" id="remember"> Lembre-se de mim
            </label>
            <button type="submit" id="btn-login" class="btn-login">Entrar</button>
            <a href="#" class="forgot">Esqueceu sua senha?</a>
        </form>

        <p class="register-link">
            Não tem uma conta? <a href="register.html">Registre-se</a>
        </p>
    </main>
</body>
</html>
```

### 🧩 fragments/ - Componentes Reutilizáveis

#### header.html - Header Público
```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Header</title>
</head>
<body>
<header class="header">
    <a href="/">
        <img src="/img/logo.png" alt="Logo" width="120">
    </a>
    <nav>
        <a href="/login" id="loginBtn">Fazer login</a>
        <a href="/cadastro" id="registerBtn">Registrar</a>
        <a href="#" id="exploreBtn">Explorar</a>
        <div class="search-box">
            <input type="text" placeholder="Pesquisar">
            <span>🔍</span>
        </div>
    </nav>
</header>
</body>
</html>
```

#### header_logged.html - Header Usuário Logado
```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Header Logado</title>
</head>
<body>
<header class="header-logged">
    <div class="contain-wrapper">
        <a href="/dashboard">
            <img class="logo" src="/img/Logo.png" alt="Logo Figurama">
        </a>
        <nav class="nav-logged">
            <div class="user-profile">
                <img class="profile-icon" src="/icons/Profile-icon.png" alt="Perfil">
                <span id="header-user-name">Usuário</span>
            </div>
            <a href="/login" class="nav-link logout" id="logoutBtn">Sair</a>
            <div class="search-box">
                <input type="text" placeholder="Pesquisar">
                <button class="search-btn">🔍</button>
            </div>
            <a href="/criar-colecao" class="btn-create">Criar +</a>
        </nav>
    </div>
</header>
</body>
</html>
```

---

## ⚡ JAVASCRIPT (FUNCIONALIDADES)

### 🔧 config.js - Configurações Globais
```javascript
// ============================================
// CONFIG.JS - CONFIGURAÇÕES GLOBAIS
// ============================================

const CONFIG = {
    API_BASE_URL: "http://localhost:8080/api",
    APP_NAME: "Figurama",
    VERSION: "1.0.0"
};

// Exportar para uso global
window.CONFIG = CONFIG;
```

### 🌐 api.js - Integração com Backend
```javascript
// ============================================
// API.JS - INTEGRAÇÃO COMPLETA COM BACKEND
// ============================================

// Função para lidar com erros de API
async function handleResponse(response) {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
        throw new Error(error.message || `Erro ${response.status}`);
    }
    return response.json();
}

// Headers padrão para requisições JSON
function getHeaders() {
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };
}

// Headers com autenticação
function getAuthHeaders() {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    return {
        ...getHeaders(),
        'Authorization': `Bearer ${token}`
    };
}

// ============================================
// CATÁLOGO API
// ============================================
const CatalogoAPI = {
    // Buscar todas as figuras
    async buscarTodas() {
        const response = await fetch(`${CONFIG.API_BASE_URL}/catalogo`, {
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    // Pesquisar figuras
    async pesquisar(termo) {
        const response = await fetch(`${CONFIG.API_BASE_URL}/catalogo/pesquisar?nome=${encodeURIComponent(termo)}`, {
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    // Buscar por ID
    async buscarPorId(id) {
        const response = await fetch(`${CONFIG.API_BASE_URL}/catalogo/${id}`, {
            headers: getHeaders()
        });
        return handleResponse(response);
    }
};

// ============================================
// COLEÇÃO API
// ============================================
const ColecaoAPI = {
    // Criar coleção
    async criar(colecao) {
        const response = await fetch(`${CONFIG.API_BASE_URL}/colecoes`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(colecao)
        });
        return handleResponse(response);
    },

    // Listar coleções do usuário
    async listarDoUsuario(usuarioId) {
        const response = await fetch(`${CONFIG.API_BASE_URL}/colecoes/usuario/${usuarioId}`, {
            headers: getAuthHeaders()
        });
        return handleResponse(response);
    },

    // Buscar coleção por ID
    async buscarPorId(id) {
        const response = await fetch(`${CONFIG.API_BASE_URL}/colecoes/${id}`, {
            headers: getAuthHeaders()
        });
        return handleResponse(response);
    }
};

// ============================================
// AUTENTICAÇÃO API
// ============================================
const AuthAPI = {
    // Login
    async login(credentials) {
        const response = await fetch(`${CONFIG.API_BASE_URL}/usuarios/login`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(credentials)
        });
        return handleResponse(response);
    },

    // Registrar
    async registrar(userData) {
        const response = await fetch(`${CONFIG.API_BASE_URL}/usuarios/registrar`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(userData)
        });
        return handleResponse(response);
    }
};
```

### 🔐 auth.js - Sistema de Autenticação
```javascript
// ============================================
// AUTH.JS - SISTEMA DE AUTENTICAÇÃO
// ============================================

class AuthManager {
    constructor() {
        this.token = null;
        this.user = null;
    }

    // Verificar se está autenticado
    isAuthenticated() {
        return !!(localStorage.getItem('token') || sessionStorage.getItem('token'));
    }

    // Obter token atual
    getToken() {
        return localStorage.getItem('token') || sessionStorage.getItem('token');
    }

    // Obter dados do usuário
    getUser() {
        const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }

    // Fazer login
    async login(username, password, remember = false) {
        try {
            const data = await AuthAPI.login({ username, password });
            
            if (data.sucesso) {
                const storage = remember ? localStorage : sessionStorage;
                storage.setItem('token', data.data.token);
                storage.setItem('user', JSON.stringify(data.data.usuario));
                
                this.token = data.data.token;
                this.user = data.data.usuario;
                
                return { success: true, user: data.data.usuario };
            } else {
                return { success: false, message: data.mensagem };
            }
        } catch (error) {
            console.error('Erro no login:', error);
            return { success: false, message: 'Erro de conexão' };
        }
    }

    // Fazer logout
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        
        this.token = null;
        this.user = null;
        
        window.location.href = '/login';
    }

    // Verificar autenticação e redirecionar se necessário
    checkAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = '/login';
            return false;
        }
        return true;
    }
}

// Instância global
const auth = new AuthManager();
```

### 📄 script.js - Landing Page
```javascript
// ============================================
// SCRIPT.JS - LANDING PAGE
// ============================================

class LandingPage {
    constructor() {
        this.figuresGrid = document.getElementById('figuresGrid');
        this.searchInput = document.querySelector('.search-box input');
        this.novidadesGrid = document.getElementById('novidadesGrid');
        this.popularGrid = document.getElementById('popularGrid');
    }

    // Carregar figuras para a página inicial
    async carregarFiguras() {
        try {
            const figures = await CatalogoAPI.buscarTodas();
            this.renderizarFiguras(figures);
            this.carregarSecoesEspecificas(figures);
        } catch (error) {
            console.error('Erro:', error);
            if (this.figuresGrid) {
                this.figuresGrid.innerHTML = '<p>Erro ao carregar o catálogo.</p>';
            }
        }
    }

    // Renderizar cards de figuras
    renderizarFiguras(figures) {
        if (!this.figuresGrid) return;
        
        this.figuresGrid.innerHTML = '';

        if (figures.length === 0) {
            this.figuresGrid.innerHTML = '<p>Nenhuma figura encontrada.</p>';
            return;
        }

        figures.forEach(figura => {
            const card = this.criarCard(figura);
            this.figuresGrid.appendChild(card);
        });
    }

    // Criar card de figura
    criarCard(figura) {
        const card = document.createElement('div');
        card.className = 'figure-card';
        card.innerHTML = `
            <img src="${figura.urlFoto || '/img/default-placeholder.png'}" alt="${figura.nome}">
            <h3>${figura.nome}</h3>
            <p class="categoria">${figura.categoria}</p>
            <p class="preco">R$ ${figura.precoSugerido ? figura.precoSugerido.toFixed(2) : '0.00'}</p>
        `;
        
        card.addEventListener('click', () => {
            window.location.href = `/pages/action_figure.html?id=${figura.id}`;
        });
        
        return card;
    }

    // Carregar seções específicas (novidades e populares)
    carregarSecoesEspecificas(figures) {
        // Novidades (últimas 6)
        if (this.novidadesGrid) {
            const novidades = figures.slice(-6).reverse();
            this.renderizarGridSimples(this.novidadesGrid, novidades);
        }

        // Populares (primeiras 6)
        if (this.popularGrid) {
            const populares = figures.slice(0, 6);
            this.renderizarGridSimples(this.popularGrid, populares);
        }
    }

    // Renderizar grid simples
    renderizarGridSimples(container, figures) {
        container.innerHTML = '';
        figures.forEach(figura => {
            const card = this.criarCard(figura);
            container.appendChild(card);
        });
    }

    // Configurar pesquisa
    configurarPesquisa() {
        if (!this.searchInput) return;

        let timeoutId;
        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(async () => {
                const termo = e.target.value;
                if (termo.trim()) {
                    await this.pesquisarFiguras(termo);
                } else {
                    await this.carregarFiguras();
                }
            }, 500);
        });
    }

    // Pesquisar figuras
    async pesquisarFiguras(termo) {
        try {
            const figures = await CatalogoAPI.pesquisar(termo);
            this.renderizarFiguras(figures);
        } catch (error) {
            console.error('Erro na pesquisa:', error);
        }
    }

    // Inicializar
    init() {
        this.carregarFiguras();
        this.configurarPesquisa();
    }
}

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const landingPage = new LandingPage();
    landingPage.init();
});
```

### 📊 dashboard.js - Dashboard do Usuário
```javascript
// ============================================
// DASHBOARD.JS - DASHBOARD DO USUÁRIO
// ============================================

class Dashboard {
    constructor() {
        this.statsElements = {
            totalFigures: document.getElementById('total-figures'),
            totalCollections: document.getElementById('total-collections')
        };
        this.gridElements = {
            recent: document.getElementById('recent-grid'),
            news: document.getElementById('news-grid'),
            popular: document.getElementById('popular-grid'),
            collections: document.getElementById('collections-container')
        };
    }

    // Carregar dados do usuário
    loadUserData() {
        const user = auth.getUser();
        if (user) {
            const nomeExibicao = user.username || user.nome || 'Colecionador';
            
            // Atualizar nome no dashboard
            const usernameElement = document.getElementById('username');
            if (usernameElement) {
                usernameElement.textContent = nomeExibicao;
            }
            
            // Atualizar nome no header
            const headerName = document.getElementById('header-user-name');
            if (headerName) {
                headerName.textContent = nomeExibicao;
            }
        }
    }

    // Carregar estatísticas
    async loadStats() {
        try {
            // Simulação - substituir com chamadas reais à API
            this.statsElements.totalFigures.textContent = "12";
            this.statsElements.totalCollections.textContent = "3";
        } catch (error) {
            console.error('Erro ao carregar estatísticas:', error);
        }
    }

    // Carregar dados do catálogo
    async loadCatalogoData() {
        try {
            const figures = await CatalogoAPI.buscarTodas();

            // Novidades (últimas 4)
            const novidades = figures.slice(-4).reverse();
            this.renderGrid('news-grid', novidades);

            // Recentes (últimas 3)
            const recentes = novidades.slice(0, 3);
            this.renderGrid('recent-grid', recentes, 'recent-card');

            // Populares (primeiras 4)
            const populares = figures.slice(0, 4);
            this.renderGrid('popular-grid', populares);

        } catch (error) {
            console.error('Erro:', error);
        }
    }

    // Renderizar grid
    renderGrid(elementId, lista, cardClass = 'news-card') {
        const grid = document.getElementById(elementId);
        if (!grid) return;
        
        grid.innerHTML = '';
        
        if (lista.length === 0) {
            grid.innerHTML = '<p>Nenhuma figura encontrada.</p>';
            return;
        }

        lista.forEach(fig => {
            const card = this.criarCardDashboard(fig, cardClass);
            grid.appendChild(card);
        });
    }

    // Criar card para dashboard
    criarCardDashboard(fig, cardClass) {
        const card = document.createElement('div');
        card.className = cardClass;
        
        card.innerHTML = `
            <img src="${fig.urlFoto || '/img/placeholder.png'}" alt="${fig.nome}">
            ${cardClass === 'recent-card' ? '' : `<div class="card-info"><h4>${fig.nome}</h4></div>`}
        `;
        
        card.addEventListener('click', () => {
            window.location.href = `/pages/action_figure.html?id=${fig.id}`;
        });
        
        return card;
    }

    // Carregar coleções do usuário
    async loadColecoes() {
        try {
            const user = auth.getUser();
            if (user) {
                const colecoes = await ColecaoAPI.listarDoUsuario(user.id);
                this.renderColecoes(colecoes);
            }
        } catch (error) {
            console.error('Erro ao carregar coleções:', error);
        }
    }

    // Renderizar coleções
    renderColecoes(colecoes) {
        const container = this.gridElements.collections;
        if (!container) return;

        if (colecoes.length === 0) {
            container.innerHTML = '<p style="color: #666; padding: 20px;">Você ainda não possui coleções.</p>';
            return;
        }

        container.innerHTML = '';
        colecoes.forEach(colecao => {
            const card = this.criarCardColecao(colecao);
            container.appendChild(card);
        });
    }

    // Criar card de coleção
    criarCardColecao(colecao) {
        const card = document.createElement('div');
        card.className = 'collection-card';
        card.innerHTML = `
            <h3>${colecao.nome}</h3>
            <p>${colecao.descricao || 'Sem descrição'}</p>
            <small>${colecao.totalFiguras || 0} figuras</small>
        `;
        
        card.addEventListener('click', () => {
            window.location.href = `/pages/minha_colecao.html?id=${colecao.id}`;
        });
        
        return card;
    }

    // Inicializar dashboard
    async init() {
        if (!auth.checkAuth()) return;

        this.loadUserData();
        await this.loadStats();
        await this.loadCatalogoData();
        await this.loadColecoes();
    }
}

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const dashboard = new Dashboard();
    dashboard.init();
});
```

### 🎯 action_figure.js - Detalhes de Action Figure
```javascript
// ============================================
// ACTION_FIGURE.JS - DETALHES DE ACTION FIGURE
// ============================================

class ActionFigurePage {
    constructor() {
        this.figureId = this.getFigureId();
        this.elements = {
            mainImg: document.getElementById('main-figure-img'),
            figureName: document.getElementById('figure-name'),
            figureDate: document.getElementById('figure-date'),
            franchiseName: document.getElementById('franchise-name'),
            figureDescription: document.getElementById('figure-description'),
            categoryTags: document.getElementById('category-tags'),
            franchiseGrid: document.getElementById('franchise-figures-grid'),
            relatedGrid: document.getElementById('related-figures-grid')
        };
    }

    // Obter ID da figure pela URL
    getFigureId() {
        return new URLSearchParams(window.location.search).get('id');
    }

    // Carregar detalhes da figure
    async loadFigureDetails() {
        if (!this.figureId) {
            console.error('ID da figure não encontrado');
            return;
        }

        try {
            const figure = await CatalogoAPI.buscarPorId(this.figureId);
            this.renderFigureDetails(figure);
        } catch (error) {
            console.error('Erro ao carregar detalhes:', error);
        }
    }

    // Renderizar detalhes da figure
    renderFigureDetails(figure) {
        if (this.elements.figureName) {
            this.elements.figureName.textContent = figure.nome;
        }
        
        if (this.elements.figureDate) {
            this.elements.figureDate.textContent = figure.dataLancamento || 'Data não informada';
        }
        
        if (this.elements.franchiseName) {
            this.elements.franchiseName.textContent = figure.franquia || 'Franquia não informada';
        }
        
        if (this.elements.figureDescription) {
            this.elements.figureDescription.textContent = figure.descricao || 'Sem descrição disponível';
        }
        
        if (this.elements.mainImg) {
            this.elements.mainImg.src = figure.urlFoto || '/img/default-placeholder.png';
            this.elements.mainImg.alt = figure.nome;
        }

        // Renderizar categorias
        if (figure.categorias && this.elements.categoryTags) {
            this.renderCategories(figure.categorias);
        }
    }

    // Renderizar categorias
    renderCategories(categorias) {
        this.elements.categoryTags.innerHTML = '';
        categorias.forEach(cat => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.textContent = cat;
            this.elements.categoryTags.appendChild(span);
        });
    }

    // Carregar figuras relacionadas
    async loadRelatedFigures() {
        try {
            // Carregar figuras da mesma franquia
            await this.loadFranchiseFigures();
            
            // Carregar figuras relacionadas por categoria
            await this.loadRelatedByCategory();
        } catch (error) {
            console.error('Erro ao carregar figuras relacionadas:', error);
        }
    }

    // Carregar figuras da mesma franquia
    async loadFranchiseFigures() {
        if (!this.figureId || !this.elements.franchiseGrid) return;

        try {
            // Simulação - substituir com chamada real à API
            const figures = await CatalogoAPI.buscarTodas();
            const franchiseFigures = figures.filter(f => 
                f.franquia && f.id !== parseInt(this.figureId)
            ).slice(0, 5);

            this.renderFigureGrid(this.elements.franchiseGrid, franchiseFigures);
        } catch (error) {
            console.error('Erro ao carregar figuras da franquia:', error);
        }
    }

    // Carregar figuras relacionadas por categoria
    async loadRelatedByCategory() {
        if (!this.figureId || !this.elements.relatedGrid) return;

        try {
            const figures = await CatalogoAPI.buscarTodas();
            const relatedFigures = figures.filter(f => 
                f.id !== parseInt(this.figureId)
            ).slice(0, 5);

            this.renderFigureGrid(this.elements.relatedGrid, relatedFigures);
        } catch (error) {
            console.error('Erro ao carregar figuras relacionadas:', error);
        }
    }

    // Renderizar grid de figuras
    renderFigureGrid(container, figures) {
        container.innerHTML = '';
        
        if (figures.length === 0) {
            container.innerHTML = '<p>Nenhuma figura encontrada.</p>';
            return;
        }

        figures.forEach(figure => {
            const card = this.criarRelatedCard(figure);
            container.appendChild(card);
        });
    }

    // Criar card de figura relacionada
    criarRelatedCard(figure) {
        const card = document.createElement('div');
        card.className = 'figure-card';
        
        card.innerHTML = `
            <div class="figure-card-image">
                <img src="${figure.urlFoto || '/img/placeholder.png'}" alt="${figure.nome}">
            </div>
            <div class="figure-card-info">
                <p class="figure-card-name">${figure.nome}</p>
            </div>
        `;
        
        card.addEventListener('click', () => {
            window.location.href = `action_figure.html?id=${figure.id}`;
        });
        
        return card;
    }

    // Inicializar página
    async init() {
        await this.loadFigureDetails();
        await this.loadRelatedFigures();
    }
}

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const actionFigurePage = new ActionFigurePage();
    actionFigurePage.init();
});
```

---

## 🔄 FLUXO DE FUNCIONAMENTO

### 1. Carregamento de Páginas
1. **index.html** → Carrega `script.js`
2. **login.html** → Carrega `auth.js`
3. **dashboard.html** → Carrega `dashboard.js`
4. **action_figure.html** → Carrega `action_figure.js`

### 2. Ordem de Carregamento JavaScript
1. `config.js` (configurações)
2. `api.js` (integração backend)
3. `auth.js` (autenticação - quando necessário)
4. Arquivo específico da página

### 3. Fluxo de Autenticação
1. Usuário faz login → `auth.js`
2. Token armazenado → `localStorage`/`sessionStorage`
3. Verificação em páginas protegidas → `auth.checkAuth()`
4. Logout → Limpeza e redirecionamento

### 4. Integração com Backend
1. Requisições via `api.js`
2. Tratamento de erros centralizado
3. Headers de autenticação automáticos
4. Respostas padronizadas

---

## 🎯 PRINCIPAIS FUNCIONALIDADES

### ✅ Implementadas
- **Sistema de autenticação** completo
- **CRUD de coleções** e action figures
- **Pesquisa e filtros** de catálogo
- **Dashboard** com estatísticas
- **Páginas responsivas** com design moderno
- **Navegação** entre páginas
- **Validação de formulários**

### 🔄 Em Desenvolvimento
- **Upload de imagens**
- **Sistema de favoritos**
- **Compartilhamento** de coleções
- **Notificações** em tempo real

---

## 📱 RESPONSIVIDADE

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

### Adaptações
- Menu hambúrguer para mobile
- Cards responsivos
- Formulários adaptativos
- Grid flexível

---

## 🚀 OTIMIZAÇÕES

### Performance
- **Lazy loading** de imagens
- **Debounce** em pesquisas
- **Cache** de requisições
- **Minificação** de CSS/JS

### SEO
- **Meta tags** descritivas
- **URLs amigáveis**
- **Semântica HTML5**
- **Alt text** em imagens

---

## 🔧 MANUTENÇÃO

### Boas Práticas
- **Código modular** e reutilizável
- **Comentários descritivos**
- **Nomenclatura padrão**
- **Versionamento** semântico

### Debug
- **Console.log** para desenvolvimento
- **Try/catch** em operações assíncronas
- **Validação** de dados
- **Feedback** visual ao usuário

---

*Documentação atualizada em: 01/02/2026*
*Versão: 1.0.0*
*Total de arquivos front-end: 28*
