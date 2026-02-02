# 📚 Documentação Frontend - Figurama

## 🎯 Visão Geral

O frontend do Figurama é construído com **Thymeleaf 3** integrado ao **Spring Boot 3.5.7**, proporcionando uma experiência moderna e responsiva para gerenciamento de coleções de action figures.

---

## 🏗️ Arquitetura Frontend

### **Tecnologias Utilizadas**
- **Thymeleaf 3** - Template Engine
- **Spring Boot 3.5.7** - Backend Integration
- **HTML5** - Estrutura Semântica
- **CSS3** - Estilização Moderna
- **JavaScript ES6+** - Interatividade
- **Bootstrap 5** - Framework CSS (via custom)

### **Estrutura de Diretórios**
```
src/main/resources/
├── templates/           # Templates Thymeleaf
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── pesquisa.html
│   ├── action_figure.html
│   ├── minha_colecao.html
│   ├── criando_colecao.html
│   ├── franquia.html
│   └── support.html
├── static/              # Recursos Estáticos
│   ├── css/            # Estilos
│   ├── js/             # Scripts
│   ├── images/         # Imagens
│   ├── icons/          # Ícones
│   └── fragments/      # Fragmentos Reutilizáveis
└── uploads/            # Uploads de Imagens
```

---

## 📄 Templates Thymeleaf

### **1. Página Principal (`index.html`)**
- **URL:** `/`
- **Descrição:** Landing page com apresentação do projeto
- **Componentes:**
  - Header com navegação
  - Hero section
  - Features showcase
  - Footer

### **2. Autenticação**
#### **Login (`login.html`)**
- **URL:** `/login`
- **Funcionalidades:**
  - Formulário de login
  - Validação client-side
  - Link para cadastro
  - Recuperação de senha

#### **Cadastro (`register.html`)**
- **URL:** `/cadastro`
- **Funcionalidades:**
  - Formulário de registro
  - Validação de campos
  - Termos de uso
  - Confirmação de email

### **3. Dashboard (`dashboard.html`)**
- **URL:** `/dashboard`
- **Descrição:** Painel principal do usuário
- **Componentes:**
  - Estatísticas da coleção
  - Ações recentes
  - Quick actions
  - Navigation sidebar

### **4. Pesquisa (`pesquisa.html`)**
- **URL:** `/explorar`
- **Funcionalidades:**
  - Busca avançada de action figures
  - Filtros por categoria, franquia, preço
  - Grid de resultados
  - Paginação

### **5. Detalhes da Action Figure (`action_figure.html`)**
- **URL:** `/detalhes?id={id}`
- **Componentes:**
  - Galeria de imagens
  - Informações detalhadas
  - Reviews e avaliações
  - Botões de ação

### **6. Gestão de Coleções**
#### **Minha Coleção (`minha_colecao.html`)**
- **URL:** `/minha-colecao`
- **Funcionalidades:**
  - Lista de itens colecionados
  - Status de posse
  - Valoração da coleção
  - Exportação

#### **Criar Coleção (`criando_colecao.html`)**
- **URL:** `/criar-colecao`
- **Funcionalidades:**
  - Formulário de nova coleção
  - Upload de imagens
  - Categorização
  - Compartilhamento

### **7. Páginas Institucionais**
#### **Franquias (`franquia.html`)**
- **URL:** `/franquias`
- **Descrição:** Catálogo de franquias disponíveis

#### **Suporte (`support.html`)**
- **URL:** `/suporte`
- **Funcionalidades:**
  - FAQ
  - Formulário de contato
  - Chat support (futuro)

---

## 🎨 Sistema de Estilos

### **CSS Architecture**
```
static/css/
├── style.css              # Estilos principais
├── components.css          # Componentes reutilizáveis
├── layout.css             # Layout e grid
├── responsive.css          # Media queries
├── animations.css          # Animações
├── dark-mode.css           # Tema escuro
├── variables.css           # Variáveis CSS
├── typography.css          # Tipografia
├── forms.css               # Formulários
├── cards.css               # Cards e grids
├── navigation.css          # Navegação
└── utilities.css           # Classes utilitárias
```

### **Design System**
#### **Cores Primárias**
```css
:root {
  --primary-color: #FF6B35;
  --secondary-color: #004E89;
  --accent-color: #00C9A7;
  --dark-color: #1A1A2E;
  --light-color: #F5F5F5;
  --success-color: #4CAF50;
  --warning-color: #FF9800;
  --error-color: #F44336;
}
```

#### **Tipografia**
```css
:root {
  --font-primary: 'Inter', sans-serif;
  --font-secondary: 'Roboto', sans-serif;
  --font-mono: 'Fira Code', monospace;
  
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
}
```

#### **Breakpoints**
```css
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}
```

---

## ⚡ JavaScript

### **Estrutura de Scripts**
```
static/js/
├── app.js                  # Aplicação principal
├── utils.js                # Funções utilitárias
├── api.js                  # Comunicação com backend
├── validation.js           # Validação de formulários
├── search.js               # Funcionalidades de busca
├── collection.js           # Gestão de coleções
├── upload.js               # Upload de arquivos
├── theme.js                # Gestão de temas
├── animations.js           # Animações e transições
├── charts.js               # Gráficos e estatísticas
├── modal.js                # Gestão de modais
└── notifications.js        # Sistema de notificações
```

### **Funcionalidades JavaScript**

#### **API Integration**
```javascript
// Exemplo de chamada API
const api = {
  async getActionFigures() {
    const response = await fetch('/api/action-figures');
    return await response.json();
  },
  
  async saveCollection(collection) {
    const response = await fetch('/api/collections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(collection)
    });
    return await response.json();
  }
};
```

#### **Form Validation**
```javascript
const validation = {
  validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },
  
  validatePassword(password) {
    return password.length >= 8;
  },
  
  showError(field, message) {
    // Implementação de exibição de erros
  }
};
```

#### **Search Functionality**
```javascript
const search = {
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  async performSearch(query) {
    // Implementação de busca
  }
};
```

---

## 🖼️ Gestão de Imagens

### **Upload System**
- **Location:** `/uploads/`
- **Formatos suportados:** JPG, PNG, WebP
- **Tamanho máximo:** 5MB
- **Redimensionamento automático**

### **Image Optimization**
```javascript
const imageUpload = {
  async compressImage(file) {
    // Compressão de imagem antes do upload
  },
  
  async uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    
    return await response.json();
  }
};
```

---

## 🎭 Componentes Reutilizáveis

### **Fragments Thymeleaf**
```
templates/fragments/
├── header.html             # Header navegacional
├── footer.html             # Footer com links
├── sidebar.html            # Sidebar dashboard
├── card.html              # Card genérico
├── modal.html              # Modal base
├── pagination.html         # Componente de paginação
└── notifications.html      # Sistema de notificações
```

### **Exemplo de Fragment**
```html
<!-- fragments/header.html -->
<header th:fragment="header" class="main-header">
  <nav class="navbar">
    <div class="nav-brand">
      <a href="/" class="logo">
        <img th:src="@{/images/logo.png}" alt="Figurama">
      </a>
    </div>
    <ul class="nav-menu">
      <li><a href="/explorar">Explorar</a></li>
      <li><a href="/franquias">Franquias</a></li>
      <li><a href="/suporte">Suporte</a></li>
    </ul>
  </nav>
</header>
```

---

## 📱 Responsividade

### **Mobile-First Approach**
- **Breakpoints:** Sm (640px), Md (768px), Lg (1024px), Xl (1280px)
- **Grid System:** CSS Grid + Flexbox
- **Touch Gestures:** Swipe, pinch-to-zoom

### **Responsive Features**
- **Navigation:** Hamburger menu para mobile
- **Cards:** Grid adaptativo (1-4 colunas)
- **Images:** Lazy loading e responsive images
- **Forms:** Input types otimizados para mobile

---

## 🎨 Temas e Personalização

### **Light/Dark Mode**
```javascript
const theme = {
  init() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.setTheme(savedTheme);
  },
  
  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  },
  
  toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }
};
```

### **Customização CSS**
```css
[data-theme="dark"] {
  --bg-primary: #1A1A2E;
  --bg-secondary: #16213E;
  --text-primary: #F5F5F5;
  --text-secondary: #B8B8B8;
}
```

---

## 🚀 Performance

### **Otimizações Implementadas**
- **Lazy Loading:** Imagens e componentes
- **Code Splitting:** Módulos JavaScript
- **Minificação:** CSS e JS em produção
- **Cache Strategy:** Service Worker (futuro)
- **Compression:** Gzip no servidor

### **Métricas de Performance**
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Cumulative Layout Shift:** < 0.1
- **First Input Delay:** < 100ms

---

## 🔧 Integração com Backend

### **Thymeleaf Integration**
```html
<!-- Exemplo de integração -->
<div class="user-profile" th:if="${user != null}">
  <img th:src="${user.avatar}" th:alt="${user.name}">
  <span th:text="${user.name}">User Name</span>
</div>

<!-- Iteração de dados -->
<div class="figures-grid">
  <div th:each="figure : ${figures}" class="figure-card">
    <img th:src="${figure.imageUrl}" th:alt="${figure.name}">
    <h3 th:text="${figure.name}">Figure Name</h3>
    <span th:text="${figure.price}">$0.00</span>
  </div>
</div>
```

### **API Endpoints**
- **GET** `/api/action-figures` - Listar action figures
- **GET** `/api/action-figures/{id}` - Detalhes da figure
- **POST** `/api/collections` - Criar coleção
- **PUT** `/api/collections/{id}` - Atualizar coleção
- **DELETE** `/api/collections/{id}` - Excluir coleção

---

## 🛡️ Segurança

### **Client-Side Security**
- **XSS Prevention:** Sanitização de inputs
- **CSRF Protection:** Tokens em formulários
- **Content Security Policy:** Headers de segurança
- **Input Validation:** Validação client e server-side

### **Data Protection**
```javascript
const security = {
  sanitizeInput(input) {
    return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  },
  
  validateInput(input, type) {
    // Validação específica por tipo
  }
};
```

---

## 📊 Analytics e Monitoramento

### **User Tracking**
- **Page Views:** Google Analytics (futuro)
- **User Interactions:** Event tracking
- **Performance Metrics:** Core Web Vitals
- **Error Tracking:** Sentry (futuro)

### **A/B Testing Framework**
```javascript
const abTesting = {
  getVariant(testName) {
    return localStorage.getItem(`ab_${testName}`) || 'control';
  },
  
  trackConversion(testName, variant) {
    // Implementação de tracking
  }
};
```

---

## 🔄 Estado Atual e Próximos Passos

### **✅ Implementado**
- [x] Templates Thymeleaf completos
- [x] Sistema de estilos responsivo
- [x] Validação de formulários
- [x] Upload de imagens
- [x] Integração com API REST
- [x] Sistema de navegação
- [x] Componentes reutilizáveis

### **🚧 Em Desenvolvimento**
- [ ] Progressive Web App (PWA)
- [ ] Service Worker para cache
- [ ] WebSockets para tempo real
- [ ] Internacionalização (i18n)
- [ ] Accessibility (a11y) improvements

### **📋 Roadmap Futuro**
- [ ] Vue.js/React migration (opcional)
- [ ] GraphQL integration
- [ ] Real-time collaboration
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard

---

## 📞 Suporte e Manutenção

### **Documentação Relacionada**
- [API Documentation](./endpoints-api.md)
- [Database Schema](../figurama_db.sql)
- [Deployment Guide](./deployment-guide.md)

### **Contato**
- **Frontend Lead:** [Nome]
- **Issues:** GitHub Issues
- **Documentation:** Atualização semanal

---

**Última atualização:** 02/02/2026  
**Versão:** 1.0.0  
**Status:** Produção ✅
