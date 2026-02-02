# Figurama - Integração Frontend/Backend com Thymeleaf

## 🏗️ Arquitetura

Este projeto usa **Spring Boot com Thymeleaf**, permitindo templates HTML dinâmicos com integração server-side enquanto mantém a API REST para operações AJAX.

## 📁 Estrutura de Arquivos

```
src/main/
├── java/com/ajm/figurama/
│   ├── controller/
│   │   ├── PageController.java      # Controller para páginas Thymeleaf
│   │   ├── UsuarioController.java   # API REST de usuários
│   │   └── ...
│   ├── config/
│   │   └── WebConfig.java          # Configuração de recursos estáticos
│   └── ...
└── resources/
    ├── templates/                   # Templates Thymeleaf
    │   ├── index.html              # Página inicial
    │   ├── login.html              # Página de login
    │   └── register.html           # Página de registro
    ├── static/                      # Arquivos estáticos servidos diretamente
    │   ├── css/                    # Arquivos CSS
    │   ├── js/                     # Arquivos JavaScript
    │   │   ├── config.js           # Configuração da API
    │   │   ├── api.js              # Funções de API
    │   │   ├── auth.js             # Gestão de autenticação
    │   │   └── pages/              # Scripts específicos por página
    │   ├── images/                 # Imagens
    │   └── icons/                  # Ícones
    └── application.properties      # Configuração do banco
```

## 🔗 Como Funciona a Integração

### 1. Frontend (Thymeleaf + JavaScript)
- **Templates Thymeleaf**: HTML com sintaxe `th:*` para server-side rendering
- **CSS**: Links usando `th:href="@{/...}"` para paths relativos
- **JavaScript**: Faz chamadas AJAX para a API REST

### 2. Backend (Spring Boot)
- **PageController**: Serve templates Thymeleaf
- **API Controllers**: Fornecem endpoints REST (`/api/*`)
- **Banco de Dados**: JPA + MySQL/H2

### 3. Conexão
- JavaScript usa `fetch()` para chamar endpoints da API
- Thymeleaf processa links estáticos com `@{/path}`
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
- `POST /api/usuarios/registrar` - Criar novo usuário
- `POST /api/usuarios/login` - Autenticar usuário
- `GET /api/usuarios/listar` - Listar todos os usuários

### Coleções
- `GET /api/colecoes` - Listar coleções
- `POST /api/colecoes` - Criar coleção
- `GET /api/colecoes/{id}` - Buscar coleção específica

### Action Figures
- `GET /api/action-figures` - Listar figuras
- `POST /api/action-figures` - Adicionar figura
- `GET /api/action-figures/{id}` - Buscar figura específica

## 🎯 Vantagens desta Abordagem

1. **Templates Dinâmicos**: Thymeleaf permite server-side rendering
2. **Links Relativos**: `@{/path}` garante paths corretos
3. **API Reutilizável**: A mesma API pode ser consumida por mobile apps
4. **Desenvolvimento Paralelo**: Frontend e Backend podem ser desenvolvidos separadamente
5. **Performance**: Arquivos estáticos servidos rapidamente
6. **Integração Server-Side**: Possibilidade de passar dados do backend para frontend

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

### PageController.java
Controller para servir templates Thymeleaf:
```java
@Controller
public class PageController {
    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/register")
    public String register() {
        return "register";
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

## 📝 Exemplo de Template Thymeleaf

```html
<!DOCTYPE html>
<html lang="pt-BR" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link rel="stylesheet" th:href="@{/css/style.css}">
    <link rel="stylesheet" th:href="@{/css/pages/login.css}">
</head>
<body>
    <main class="login-content">
        <h1 class="title-login">Bem-Vindo de Volta</h1>
        <form id="login-form" class="login-area">
            <input type="text" id="login-username" placeholder="Nome de usuário" required>
            <input type="password" id="login-password" placeholder="Senha" required>
            <button type="submit" class="btn-login">Entrar</button>
        </form>
        <p class="register-link">Não tem uma conta? <a th:href="@{/register}">Registre-se</a></p>
    </main>
    
    <script th:src="@{/js/config.js}"></script>
    <script th:src="@{/js/api.js}"></script>
    <script th:src="@{/js/auth.js}"></script>
    <script th:src="@{/js/pages/login.js}"></script>
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
.then(response => response.json())
.then(data => console.log('Sucesso:', data))
.catch(error => console.error('Erro:', error));
```

Esta abordagem combina o melhor dos dois mundos: templates server-side com Thymeleaf para renderização inicial e API REST para operações dinâmicas, permitindo fácil evolução para SPA frameworks como React, Vue ou Angular no futuro.
