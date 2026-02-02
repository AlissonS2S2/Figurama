# Figurama - Integração Frontend/Backend sem Thymeleaf

## 🏗️ Arquitetura

Este projeto usa **Spring Boot com arquivos estáticos**, permitindo que HTML, CSS e JavaScript funcionem de forma independente do backend Java.

## 📁 Estrutura de Arquivos

```
src/main/
├── java/com/ajm/figurama/
│   ├── controller/
│   │   ├── WebController.java     # Redireciona para páginas HTML
│   │   ├── UsuarioController.java # API REST de usuários
│   │   └── ...
│   ├── config/
│   │   └── WebConfig.java         # Configuração de recursos estáticos
│   └── ...
└── resources/
    ├── static/                     # Arquivos estáticos servidos diretamente
    │   ├── index.html             # Página inicial
    │   ├── pages/                 # Outras páginas HTML
    │   ├── css/                   # Arquivos CSS
    │   ├── js/                    # Arquivos JavaScript
    │   │   ├── config.js          # Configuração da API
    │   │   ├── api.js             # Funções de API
    │   │   ├── auth.js            # Gestão de autenticação
    │   │   └── pages/             # Scripts específicos por página
    │   └── images/                # Imagens
    └── application.properties     # Configuração do banco
```

## 🔗 Como Funciona a Integração

### 1. Frontend (HTML/CSS/JS)
- **HTML puro**: Sem Thymeleaf, apenas HTML5 padrão
- **CSS**: Links diretos nos arquivos HTML
- **JavaScript**: Faz chamadas AJAX para a API REST

### 2. Backend (Spring Boot)
- **WebController**: Redireciona URLs para arquivos estáticos
- **API Controllers**: Fornecem endpoints REST (`/api/*`)
- **Banco de Dados**: JPA + MySQL/H2

### 3. Conexão
- JavaScript usa `fetch()` para chamar endpoints da API
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
- Registro: `http://localhost:8080/cadastro`
- Dashboard: `http://localhost:8080/dashboard`

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

1. **Separação Clara**: Frontend e Backend são totalmente independentes
2. **Fácil Deploy**: Arquivos estáticos são servidos diretamente pelo Spring Boot
3. **API Reutilizável**: A mesma API pode ser consumida por mobile apps
4. **Desenvolvimento Paralelo**: Frontend e Backend podem ser desenvolvidos separadamente
5. **Performance**: Arquivos estáticos servidos rapidamente
6. **Sem Compilação de Templates**: HTML puro, sem necessidade de processamento Thymeleaf

## 🔧 Configuração Importante

### WebConfig.java
Garante que arquivos estáticos sejam servidos e configura CORS:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/");
    }
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:8080")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
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

Esta abordagem é moderna, escalável e permite fácil integração com frameworks frontend como React, Vue ou Angular no futuro.
