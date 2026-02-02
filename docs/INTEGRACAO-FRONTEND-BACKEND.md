# Figurama - Integração Frontend/Backend com Spring Boot

## 🏗️ Arquitetura

Este projeto usa **Spring Boot com frontend estático**, permitindo servir arquivos HTML/CSS/JavaScript diretamente enquanto mantém a API REST para operações AJAX.

## 📁 Estrutura de Arquivos

```
src/main/
├── java/com/ajm/figurama/
│   ├── controller/
│   │   ├── WebController.java       # Controller para páginas estáticas
│   │   ├── UsuarioController.java   # API REST de usuários
│   │   ├── ActionFigureController.java  # API REST de figures
│   │   ├── ColecaoController.java   # API REST de coleções
│   │   └── ...
│   ├── config/
│   │   ├── WebConfig.java          # Configuração de recursos estáticos
│   │   └── CorsConfig.java         # Configuração de CORS
│   └── ...
└── resources/
    ├── static/                      # Arquivos estáticos servidos diretamente
    │   ├── css/                    # Arquivos CSS
    │   ├── js/                     # Arquivos JavaScript
    │   │   ├── config.js           # Configuração da API
    │   │   ├── api.js              # Funções de API
    │   │   ├── auth.js             # Gestão de autenticação
    │   │   └── pages/              # Scripts específicos por página
    │   ├── pages/                  # Páginas HTML
    │   │   ├── index.html          # Página inicial
    │   │   ├── login.html          # Página de login
    │   │   ├── register.html       # Página de registro
    │   │   └── ...
    │   ├── images/                 # Imagens
    │   └── icons/                  # Ícones
    └── application.properties      # Configuração do banco
```

## 🔗 Como Funciona a Integração

### 1. Frontend (HTML/CSS/JavaScript)
- **HTML Puro**: Arquivos HTML estáticos servidos diretamente
- **CSS**: Links relativos para arquivos CSS na pasta /css/
- **JavaScript**: Faz chamadas AJAX para a API REST

### 2. Backend (Spring Boot)
- **WebController**: Serve arquivos estáticos usando `forward:`
- **API Controllers**: Fornecem endpoints REST (`/api/*`)
- **Banco de Dados**: JPA + MySQL

### 3. Conexão
- JavaScript usa `fetch()` para chamar endpoints da API
- WebController redireciona rotas para arquivos estáticos
- Configuração em `js/config.js` define a URL base: `http://localhost:8080/api`

## 🚀 Como Usar

### 1. Iniciar o Backend
```bash
mvn spring-boot:run
```
O backend estará rodando em `http://localhost:8080`

### 2. Acessar as Páginas
- Home: `http://localhost:8080/`
- Login: `http://localhost:8080/login`
- Registro: `http://localhost:8080/register`
- Dashboard: `http://localhost:8080/dashboard` (em desenvolvimento)

### 3. Fluxo de Autenticação
1. Usuário preenche formulário de registro/login
2. JavaScript envia dados para `/api/usuarios/registrar` ou `/api/usuarios/login`
3. Backend processa e retorna resposta
4. JavaScript salva dados no `localStorage`
5. Páginas protegidas verificam autenticação

## 🔧 Endpoints da API

### Usuários
- `POST /api/usuarios/login` - Autenticar usuário
- `POST /api/usuarios/registrar` - Criar novo usuário
- `GET /api/usuarios/listar` - Listar todos os usuários

### Coleções
- `GET /api/colecoes/listar` - Listar coleções
- `POST /api/colecoes/salvar` - Criar coleção
- `DELETE /api/colecoes/{id}` - Excluir coleção

### Action Figures
- `GET /api/action-figures/listar` - Listar figuras
- `GET /api/action-figures/{id}` - Buscar figura específica
- `GET /api/action-figures/buscar?termo={nome}` - Buscar figuras por nome
- `POST /api/action-figures/adicionar-existente` - Adicionar figura à coleção
- `DELETE /api/action-figures/{id}` - Remover figura

## 🎯 Vantagens desta Abordagem

1. **Frontend Estático**: HTML/CSS/JS servidos diretamente sem processamento server-side
2. **Links Relativos**: Paths relativos garantem funcionamento em qualquer ambiente
3. **API Reutilizável**: A mesma API pode ser consumida por mobile apps
4. **Desenvolvimento Paralelo**: Frontend e Backend podem ser desenvolvidos separadamente
5. **Performance**: Arquivos estáticos servidos rapidamente pelo Spring Boot
6. **Simplicidade**: Menos complexidade que templates server-side

## 🔧 Configuração Importante

### WebConfig.java
Garante que arquivos estáticos sejam servidos e configura CORS:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/css/**")
                .addResourceLocations("classpath:/static/css/");
        registry.addResourceHandler("/js/**")
                .addResourceLocations("classpath:/static/js/");
        registry.addResourceHandler("/images/**")
                .addResourceLocations("classpath:/static/images/");
        registry.addResourceHandler("/icons/**")
                .addResourceLocations("classpath:/static/icons/");
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/");
    }
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:8080")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
    }
}
```

### WebController.java
Controller para servir arquivos estáticos:
```java
@Controller
public class WebController {
    @GetMapping("/")
    public String home() {
        return "forward:/index.html";
    }

    @GetMapping("/login")
    public String login() {
        return "forward:/pages/login.html";
    }

    @GetMapping("/cadastro")
    public String cadastro() {
        return "forward:/pages/register.html";
    }
}
```

### config.js
Define a URL base da API:
```javascript
const CONFIG = {
    API_BASE_URL: "http://localhost:8080/api",
    APP_NAME: "Figurama"
};
```

## 📝 Exemplo de HTML Estático

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/css/pages/login.css">
</head>
<body>
    <main class="login-content">
        <h1 class="title-login">Bem-Vindo de Volta</h1>
        <form id="login-form" class="login-area">
            <input type="text" id="login-username" placeholder="Nome de usuário" required>
            <input type="password" id="login-password" placeholder="Senha" required>
            <button type="submit" class="btn-login">Entrar</button>
        </form>
        <p class="register-link">Não tem uma conta? <a href="/cadastro">Registre-se</a></p>
    </main>
    
    <script src="/js/config.js"></script>
    <script src="/js/api.js"></script>
    <script src="/js/auth.js"></script>
    <script src="/js/pages/login.js"></script>
</body>
</html>
```

## 📝 Exemplo de Chamada AJAX

```javascript
// Registro de usuário
const userData = {
    nomeUsuario: "joao",
    email: "joao@email.com",
    senha: "123456"
};

fetch(`${CONFIG.API_BASE_URL}/usuarios/registrar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
})
.then(response => response.text())
.then(data => console.log('Sucesso:', data))
.catch(error => console.error('Erro:', error));
```

Esta abordagem combina simplicidade com flexibilidade: frontend estático puro para desenvolvimento rápido e API REST completa para operações dinâmicas, permitindo fácil evolução para SPA frameworks como React, Vue ou Angular no futuro.
