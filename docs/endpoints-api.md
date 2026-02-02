# 📚 Documentação Completa dos Endpoints API - Projeto Figurama

Este documento descreve todos os endpoints REST disponíveis na API do projeto Figurama, incluindo métodos, parâmetros, respostas e exemplos de uso.

**📅 ÚLTIMA ATUALIZAÇÃO: 02/02/2026**
**🔄 VERSÃO: 2.1.0 - Integração Frontend/Backend sem Thymeleaf**
**✅ STATUS: CSS/JS linkados com HTML, backend funcional, sem Thymeleaf**

---

## 🌐 Informações Gerais da API

- **Base URL**: `http://localhost:8080`
- **API Base URL**: `http://localhost:8080/api`
- **Content-Type**: `application/json`
- **Métodos HTTP**: GET, POST, PUT, DELETE
- **Respostas**: JSON com status HTTP apropriados
- **Autenticação**: Bearer Token (JWT)
- **Banco de Dados**: MySQL 8.0 com Docker
- **CORS**: Configurado para desenvolvimento

---

## � Endpoints de Autenticação

### 1. Login de Usuário
**Endpoint**: `POST /api/usuarios/login`

**Descrição**: Autentica usuário e retorna token JWT.

**Request Body**:
```json
{
  "username": "usuario@example.com",
  "password": "senha123"
}
```

**Resposta de Sucesso (200 OK)**:
```json
{
  "sucesso": true,
  "mensagem": "Login realizado com sucesso",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "usuario": {
      "id": 1,
      "username": "usuario@example.com",
      "nome": "Nome do Usuário"
    }
  }
}
```

### 2. Registrar Novo Usuário
**Endpoint**: `POST /api/usuarios/registrar`

**Descrição**: Cadastra novo usuário no sistema.

**Request Body**:
```json
{
  "email": "novo@example.com",
  "username": "novousuario",
  "password": "senha123"
}
```

**Resposta de Sucesso (201 Created)**:
```json
{
  "sucesso": true,
  "mensagem": "Usuário criado com sucesso",
  "data": {
    "id": 2,
    "username": "novousuario",
    "email": "novo@example.com"
  }
}
```

---

## 📚 Endpoints de Catálogo

### 1. Listar Todas as Action Figures
**Endpoint**: `GET /api/catalogo`

**Descrição**: Retorna lista completa de action figures cadastradas.

**Resposta de Sucesso (200 OK)**:
```json
[
  {
    "id": 1,
    "nome": "Homem de Ferro Mark 50",
    "categoria": "Marvel",
    "franquia": "Marvel Studios",
    "descricao": "Figura do Homem de Ferro",
    "urlFoto": "http://example.com/ironman.jpg",
    "precoSugerido": 299.99,
    "dataLancamento": "2023-01-15"
  }
]
```

### 2. Pesquisar Action Figures
**Endpoint**: `GET /api/catalogo/pesquisar`

**Descrição**: Busca action figures por nome.

**Parâmetros Query**:
- `nome` (string, obrigatório): Termo de busca

**Exemplo**: `GET /api/catalogo/pesquisar?nome=homem`

### 3. Buscar Action Figure por ID
**Endpoint**: `GET /api/catalogo/{id}`

**Descrição**: Retorna detalhes de uma action figure específica.

**Parâmetros Path**:
- `id` (long, obrigatório): ID da action figure

---

## 📁 Endpoints de Coleções

### 1. Criar Nova Coleção
**Endpoint**: `POST /api/colecoes`

**Descrição**: Cria nova coleção para o usuário autenticado.

**Headers**: `Authorization: Bearer {token}`

**Request Body**:
```json
{
  "nome": "Minha Coleção Marvel",
  "descricao": "Figuras dos Vingadores",
  "publica": true,
  "colecionadorId": 1
}
```

### 2. Listar Coleções do Usuário
**Endpoint**: `GET /api/colecoes/usuario/{usuarioId}`

**Descrição**: Retorna todas as coleções de um usuário específico.

**Headers**: `Authorization: Bearer {token}`

### 3. Buscar Coleção por ID
**Endpoint**: `GET /api/colecoes/{id}`

**Descrição**: Retorna detalhes de uma coleção específica.

### 4. Atualizar Coleção
**Endpoint**: `PUT /api/colecoes/{id}`

**Descrição**: Atualiza dados de uma coleção existente.

**Headers**: `Authorization: Bearer {token}`

### 5. Excluir Coleção
**Endpoint**: `DELETE /api/colecoes/{id}`

**Descrição**: Remove uma coleção do sistema.

**Headers**: `Authorization: Bearer {token}`

---

## 🎯 Endpoints de Itens de Coleção

### 1. Adicionar Item à Coleção
**Endpoint**: `POST /api/colecoes/{colecaoId}/itens`

**Descrição**: Adiciona uma action figure a uma coleção.

**Headers**: `Authorization: Bearer {token}`

**Request Body**:
```json
{
  "actionFigureId": 1,
  "dataAdicao": "2023-01-15",
  "observacoes": "Figura em estado novo"
}
```

### 2. Remover Item da Coleção
**Endpoint**: `DELETE /api/colecoes/{colecaoId}/itens/{itemId}`

**Descrição**: Remove um item específico de uma coleção.

**Headers**: `Authorization: Bearer {token}`

---

## 📊 Endpoints de Estatísticas

### 1. Estatísticas do Usuário
**Endpoint**: `GET /api/usuarios/{id}/estatisticas`

**Descrição**: Retorna estatísticas do usuário (total de coleções, figuras, etc.).

**Headers**: `Authorization: Bearer {token}`

**Resposta de Sucesso (200 OK)**:
```json
{
  "totalColecoes": 5,
  "totalFiguras": 23,
  "colecoesPublicas": 3,
  "figurasFavoritas": 8
}
```

---

## 🌐 Endpoints de Páginas (WebController)

### 1. Página Principal
**Endpoint**: `GET /`

**Descrição**: Redireciona para `index.html` usando `forward:`.

### 2. Páginas Estáticas (Arquivos Estáticos)
**Endpoint**: `GET /{rota}`

**Descrição**: Redireciona para arquivos HTML estáticos usando `forward:`.

**Páginas disponíveis**:
- `GET /` → `forward:/index.html` - Página inicial
- `GET /login` → `forward:/pages/login.html` - Página de login
- `GET /cadastro` → `forward:/pages/register.html` - Registro
- `GET /explorar` → `forward:/pages/pesquisa.html` - Pesquisa
- `GET /franquias` → `forward:/pages/franquia.html` - Franquias
- `GET /suporte` → `forward:/pages/support.html` - Suporte
- `GET /detalhes` → `forward:/pages/action_figure.html` - Detalhes da figure
- `GET /dashboard` → `forward:/pages/dashboard.html` - Dashboard
- `GET /minha-colecao` → `forward:/pages/minha_colecao.html` - Minha coleção
- `GET /criar-colecao` → `forward:/pages/criando_colecao.html` - Criar coleção

---

## 🔧 Configurações do Projeto

### Banco de Dados MySQL
```yaml
# compose.yaml
services:
  mysql:
    image: 'mysql:8.0'
    environment:
      - 'MYSQL_DATABASE=figurama_db'
      - 'MYSQL_ROOT_PASSWORD=root123'
      - 'MYSQL_USER=figurama'
      - 'MYSQL_PASSWORD=figurama123'
    ports:
      - '3306:3306'
    volumes:
      - mysql_data:/var/lib/mysql
```

### Application Properties
```properties
# application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/figurama_db
spring.datasource.username=figurama
spring.datasource.password=figurama123
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true
```

### CORS Configuration
```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:8080", "http://127.0.0.1:8080")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

### 📁 Arquivos Estáticos
```
http://localhost:8080/
├── css/
│   ├── style.css
│   ├── components/buttons.css
│   ├── components/cards.css
│   ├── components/forms.css
│   └── pages/*.css
├── js/
│   ├── config.js
│   ├── api.js
│   ├── auth.js
│   ├── script.js
│   ├── action_figure.js
│   ├── criando_colecao.js
│   ├── dashboard.js
│   ├── minha_colecao.js
│   └── app.js
├── pages/
│   ├── action_figure.html
│   ├── criando_colecao.html
│   ├── dashboard.html
│   ├── franquia.html
│   ├── login.html
│   ├── minha_colecao.html
│   ├── pesquisa.html
│   ├── register.html
│   └── support.html
├── fragments/
│   ├── footer.html
│   ├── header.html
│   ├── header_logged.html
│   └── layout.html
└── index.html
```

### 🌐 API REST
```
http://localhost:8080/api/
├── usuarios/
│   ├── POST /login
│   ├── POST /registrar
│   └── GET /{id}/estatisticas
├── catalogo/
│   ├── GET /
│   ├── GET /pesquisar
│   └── GET /{id}
├── colecoes/
│   ├── GET /
│   ├── POST /
│   ├── GET /{id}
│   ├── PUT /{id}
│   ├── DELETE /{id}
│   ├── GET /usuario/{usuarioId}
│   └── POST /{colecaoId}/itens
└── uploads/ (para imagens)
```

---

## ⚠️ Códigos de Status

### ✅ Sucesso
- `200 OK` - Requisição bem-sucedida
- `201 Created` - Recurso criado
- `204 No Content` - Recurso excluído

### ❌ Erros de Cliente
- `400 Bad Request` - Requisição inválida
- `401 Unauthorized` - Não autenticado
- `403 Forbidden` - Sem permissão
- `404 Not Found` - Recurso não encontrado

### 🔧 Erros de Servidor
- `500 Internal Server Error` - Erro interno
- `503 Service Unavailable` - Serviço indisponível

---

## � Como Executar o Projeto

### 1. Pré-requisitos
- **Java 17+**
- **Maven 3.6+**
- **Docker e Docker Compose**
- **MySQL Workbench** (opcional)

### 2. Subir o Banco de Dados
```bash
docker-compose up -d
```

### 3. Criar Banco e Usuário
Execute o script `docs/figurama_db.sql` no MySQL:
```bash
# Conectar ao container Docker
docker exec -it figurama-mysql mysql -u root -p

# Ou usar MySQL Workbench com:
# Host: localhost:3306
# User: root
# Password: root123
```

### 4. Iniciar a Aplicação
```bash
# Usando Maven wrapper (recomendado)
.\mvnw.cmd spring-boot:run

# Ou Maven local
mvn spring-boot:run
```

### 5. Acessar a Aplicação
- **Frontend**: `http://localhost:8080`
- **API REST**: `http://localhost:8080/api`
- **Banco MySQL**: `localhost:3306`

---

## ✅ Correções Aplicadas (02/02/2026 - v2.1.0)

### 🔧 **Problemas Resolvidos:**
1. **✅ Banco de Dados**: Adicionado MySQL dialect no `application.properties`
2. **✅ WebController**: Convertido para `forward:` para servir arquivos estáticos
3. **✅ Docker**: Substituído PostgreSQL por MySQL 8.0
4. **✅ CORS**: Configurado para desenvolvimento
5. **✅ Compilação**: Projeto compila sem erros (23 arquivos Java)
6. **✅ Integração Frontend/Backend**: CSS/JS linkados sem Thymeleaf
7. **✅ WebConfig**: Criado para servir arquivos estáticos
8. **✅ Scripts específicos**: Implementados para login e registro
9. **✅ Endpoint login**: Adicionado ao UsuarioController
10. **✅ findByEmail()**: Adicionado ao UsuarioRepository

### 📊 **Status Atual:**
- **Backend**: ✅ Funcional
- **Banco**: ✅ Configurado
- **Frontend**: ✅ Estático servido e integrado
- **API**: ✅ Endpoints disponíveis
- **CORS**: ✅ Configurado
- **Integração**: ✅ CSS/JS/HTML conectados ao backend

---
    "descricao": "Coleção de figuras dos Vingadores",
    "quantidade": 15,
    "figures": [
      {
        "id": 1,
        "nome": "Homem de Ferro",
        "franquia": "Marvel",
        "fotoUrl": "https://exemplo.com/ironman.jpg",
        "colecao": null
      }
    ]
  }
]
```

**Exemplo de Requisição**:
```bash
curl -X GET http://localhost:8080/colecoes/listar
```

---

### 2. Salvar Nova Coleção
**Endpoint**: `POST /colecoes/salvar`

**Descrição**: Cria uma nova coleção no sistema.

**Parâmetros**: 
- **Corpo da Requisição (JSON)**:
```json
{
  "titulo": "Heróis DC",
  "descricao": "Coleção de figuras da DC Comics",
  "quantidade": 10
}
```

**Resposta de Sucesso (200 OK)**:
```json
{
  "id": 2,
  "titulo": "Heróis DC",
  "descricao": "Coleção de figuras da DC Comics",
  "quantidade": 10,
  "figures": []
}
```

**Exemplo de Requisição**:
```bash
curl -X POST http://localhost:8080/colecoes/salvar \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Heróis DC",
    "descricao": "Coleção de figuras da DC Comics", 
    "quantidade": 10
  }'
```

---

## 🦸 Endpoints de Action Figures

### 1. Listar Todas as Action Figures
**Endpoint**: `GET /action-figures/listar`

**Descrição**: Retorna uma lista com todas as figuras de ação cadastradas.

**Parâmetros**: Nenhum

**Resposta de Sucesso (200 OK)**:
```json
[
  {
    "id": 1,
    "nome": "Homem de Ferro",
    "franquia": "Marvel",
    "fotoUrl": "https://exemplo.com/ironman.jpg",
    "colecao": {
      "id": 1,
      "titulo": "Heróis Marvel",
      "descricao": "Coleção de figuras dos Vingadores",
      "quantidade": 15,
      "figures": null
    }
  }
]
```

**Exemplo de Requisição**:
```bash
curl -X GET http://localhost:8080/action-figures/listar
```

---

### 2. Buscar Action Figure por ID
**Endpoint**: `GET /action-figures/{id}`

**Descrição**: Retorna uma figura de ação específica pelo seu ID.

**Parâmetros**:
- **Path Parameter**: `id` (Long) - ID da figura de ação

**Resposta de Sucesso (200 OK)**:
```json
{
  "id": 1,
  "nome": "Homem de Ferro",
  "franquia": "Marvel",
  "fotoUrl": "https://exemplo.com/ironman.jpg",
  "descricao": "Figura do Homem de Ferro",
  "anoLancamento": "2023",
  "ativo": true,
  "categoria": "Heróis",
  "colecao": {
    "id": 1,
    "titulo": "Heróis Marvel",
    "descricao": "Coleção de figuras dos Vingadores",
    "quantidade": 15,
    "figures": null
  }
}
```

**Resposta de Erro (500 Internal Server Error)**:
```json
{
  "timestamp": "2026-01-31T15:30:00.000+00:00",
  "status": 500,
  "error": "Internal Server Error",
  "message": "Action Figure não encontrada com ID: 999",
  "path": "/action-figures/999"
}
```

**Exemplo de Requisição**:
```bash
curl -X GET http://localhost:8080/action-figures/1
```

---

### 3. Buscar Action Figures por Nome
**Endpoint**: `GET /action-figures/buscar?termo={nome}`

**Descrição**: Retorna figuras de ação que contenham o termo de busca no nome (case insensitive).

**Parâmetros**:
- **Query Parameter**: `termo` (String) - Termo para busca no nome da figura

**Resposta de Sucesso (200 OK)**:
```json
[
  {
    "id": 1,
    "nome": "Homem de Ferro",
    "franquia": "Marvel",
    "fotoUrl": "https://exemplo.com/ironman.jpg",
    "descricao": "Figura do Homem de Ferro",
    "anoLancamento": "2023",
    "ativo": true,
    "categoria": "Heróis",
    "colecao": {
      "id": 1,
      "titulo": "Heróis Marvel",
      "descricao": "Coleção de figuras dos Vingadores",
      "quantidade": 15,
      "figures": null
    }
  }
]
```

**Exemplo de Requisição**:
```bash
curl -X GET "http://localhost:8080/action-figures/buscar?termo=Ferro"
```

---

### 4. Buscar Action Figures por Coleção
**Endpoint**: `GET /action-figures/colecao/{colecaoId}`

**Descrição**: Retorna todas as figuras de ação pertencentes a uma coleção específica.

**Parâmetros**:
- **Path Parameter**: `colecaoId` (Long) - ID da coleção

**Resposta de Sucesso (200 OK)**:
```json
[
  {
    "id": 1,
    "nome": "Homem de Ferro",
    "franquia": "Marvel",
    "fotoUrl": "https://exemplo.com/ironman.jpg",
    "descricao": "Figura do Homem de Ferro",
    "anoLancamento": "2023",
    "ativo": true,
    "categoria": "Heróis",
    "colecao": {
      "id": 1,
      "titulo": "Heróis Marvel",
      "descricao": "Coleção de figuras dos Vingadores",
      "quantidade": 15,
      "figures": null
    }
  },
  {
    "id": 2,
    "nome": "Capitão América",
    "franquia": "Marvel",
    "fotoUrl": "https://exemplo.com/captain.jpg",
    "descricao": "Figura do Capitão América",
    "anoLancamento": "2023",
    "ativo": true,
    "categoria": "Heróis",
    "colecao": {
      "id": 1,
      "titulo": "Heróis Marvel",
      "descricao": "Coleção de figuras dos Vingadores",
      "quantidade": 15,
      "figures": null
    }
  }
]
```

**Exemplo de Requisição**:
```bash
curl -X GET http://localhost:8080/action-figures/colecao/1
```

---

### 5. Buscar Action Figures por Franquia
**Endpoint**: `GET /action-figures/franquia?franquia={nome}`

**Descrição**: Retorna todas as figuras de ação de uma franquia específica.

**Parâmetros**:
- **Query Parameter**: `franquia` (String) - Nome da franquia

**Resposta de Sucesso (200 OK)**:
```json
[
  {
    "id": 1,
    "nome": "Homem de Ferro",
    "franquia": "Marvel",
    "fotoUrl": "https://exemplo.com/ironman.jpg",
    "descricao": "Figura do Homem de Ferro",
    "anoLancamento": "2023",
    "ativo": true,
    "categoria": "Heróis",
    "colecao": {
      "id": 1,
      "titulo": "Heróis Marvel",
      "descricao": "Coleção de figuras dos Vingadores",
      "quantidade": 15,
      "figures": null
    }
  },
  {
    "id": 3,
    "nome": "Thor",
    "franquia": "Marvel",
    "fotoUrl": "https://exemplo.com/thor.jpg",
    "descricao": "Figura do Thor",
    "anoLancamento": "2023",
    "ativo": true,
    "categoria": "Heróis",
    "colecao": {
      "id": 1,
      "titulo": "Heróis Marvel",
      "descricao": "Coleção de figuras dos Vingadores",
      "quantidade": 15,
      "figures": null
    }
  }
]
```

**Exemplo de Requisição**:
```bash
curl -X GET "http://localhost:8080/action-figures/franquia?franquia=Marvel"
```

---

### 6. Salvar Nova Action Figure
**Endpoint**: `POST /action-figures/salvar`

**Descrição**: Cria uma nova figura de ação no sistema.

**Parâmetros**:
- **Corpo da Requisição (JSON)**:
```json
{
  "nome": "Batman",
  "franquia": "DC",
  "fotoUrl": "https://exemplo.com/batman.jpg",
  "descricao": "Figura do Batman",
  "anoLancamento": "2023",
  "ativo": true,
  "categoria": "Heróis",
  "colecaoId": 2
}
```

**Resposta de Sucesso (200 OK)**:
```json
{
  "id": 4,
  "nome": "Batman",
  "franquia": "DC",
  "fotoUrl": "https://exemplo.com/batman.jpg",
  "descricao": "Figura do Batman",
  "anoLancamento": "2023",
  "ativo": true,
  "categoria": "Heróis",
  "colecao": {
    "id": 2,
    "titulo": "Heróis DC",
    "descricao": "Coleção de figuras da DC Comics",
    "quantidade": 10,
    "figures": null
  }
}
```

**Resposta de Erro (500 Internal Server Error)**:
```json
{
  "timestamp": "2026-01-31T15:30:00.000+00:00",
  "status": 500,
  "error": "Internal Server Error",
  "message": "Coleção não encontrada com ID: 999",
  "path": "/action-figures/salvar"
}
```

**Exemplo de Requisição**:
```bash
curl -X POST http://localhost:8080/action-figures/salvar \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Batman",
    "franquia": "DC",
    "fotoUrl": "https://exemplo.com/batman.jpg",
    "descricao": "Figura do Batman",
    "anoLancamento": "2023",
    "ativo": true,
    "categoria": "Heróis",
    "colecaoId": 2
  }'
```

---

### 7. Atualizar Action Figure
**Endpoint**: `PUT /action-figures/{id}`

**Descrição**: Atualiza os dados de uma figura de ação existente.

**Parâmetros**:
- **Path Parameter**: `id` (Long) - ID da figura de ação a ser atualizada
- **Corpo da Requisição (JSON)**:
```json
{
  "nome": "Homem de Ferro (Atualizado)",
  "franquia": "Marvel Studios",
  "fotoUrl": "https://exemplo.com/ironman-new.jpg",
  "descricao": "Figura atualizada do Homem de Ferro",
  "anoLancamento": "2024",
  "ativo": true,
  "categoria": "Heróis",
  "colecaoId": 1
}
```

**Resposta de Sucesso (200 OK)**:
```json
{
  "id": 1,
  "nome": "Homem de Ferro (Atualizado)",
  "franquia": "Marvel Studios",
  "fotoUrl": "https://exemplo.com/ironman-new.jpg",
  "descricao": "Figura atualizada do Homem de Ferro",
  "anoLancamento": "2024",
  "ativo": true,
  "categoria": "Heróis",
  "colecao": {
    "id": 1,
    "titulo": "Heróis Marvel",
    "descricao": "Coleção de figuras dos Vingadores",
    "quantidade": 15,
    "figures": null
  }
}
```

**Exemplo de Requisição**:
```bash
curl -X PUT http://localhost:8080/action-figures/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Homem de Ferro (Atualizado)",
    "franquia": "Marvel Studios",
    "fotoUrl": "https://exemplo.com/ironman-new.jpg",
    "descricao": "Figura atualizada do Homem de Ferro",
    "anoLancamento": "2024",
    "ativo": true,
    "categoria": "Heróis",
    "colecaoId": 1
  }'
```

---

### 8. Remover Action Figure da Coleção
**Endpoint**: `DELETE /action-figures/{id}`

**Descrição**: Remove uma figura de ação da coleção do usuário (delete normal).

**Parâmetros**:
- **Path Parameter**: `id` (Long) - ID da figura de ação a ser removida

**Resposta de Sucesso (204 No Content)**:
```http
HTTP/1.1 204 No Content
```

**Resposta de Erro (500 Internal Server Error)**:
```json
{
  "timestamp": "2026-01-31T15:30:00.000+00:00",
  "status": 500,
  "error": "Internal Server Error",
  "message": "Action Figure não encontrada com ID: 999",
  "path": "/action-figures/999"
}
```

**Exemplo de Requisição**:
```bash
curl -X DELETE http://localhost:8080/action-figures/1
```

---

### 9. Excluir Action Figure do Banco (Admin)
**Endpoint**: `DELETE /action-figures/{id}/definitivo`

**Descrição**: Exclui definitivamente uma figura de ação do banco de dados (função administrativa).

**Parâmetros**:
- **Path Parameter**: `id` (Long) - ID da figura de ação a ser excluída

**Resposta de Sucesso (204 No Content)**:
```http
HTTP/1.1 204 No Content
```

**Exemplo de Requisição**:
```bash
curl -X DELETE http://localhost:8080/action-figures/1/definitivo
```

---

### 10. Adicionar Figura Existente à Coleção
**Endpoint**: `POST /action-figures/adicionar-existente`

**Descrição**: Adiciona uma figura existente a uma coleção específica.

**Parâmetros**:
- **Query Parameter**: `figureId` (Long) - ID da figura existente
- **Query Parameter**: `colecaoId` (Long) - ID da coleção de destino

**Resposta de Sucesso (200 OK)**:
```json
{
  "id": 1,
  "nome": "Homem de Ferro",
  "franquia": "Marvel",
  "fotoUrl": "https://exemplo.com/ironman.jpg",
  "descricao": "Figura do Homem de Ferro",
  "anoLancamento": "2023",
  "ativo": true,
  "categoria": "Heróis",
  "colecao": {
    "id": 2,
    "titulo": "Heróis DC",
    "descricao": "Coleção de figuras da DC Comics",
    "quantidade": 10,
    "figures": null
  }
}
```

**Exemplo de Requisição**:
```bash
curl -X POST "http://localhost:8080/action-figures/adicionar-existente?figureId=1&colecaoId=2"
```

---

### 11. Listar Novidades
**Endpoint**: `GET /action-figures/novidades`

**Descrição**: Retorna as 6 figuras de ação mais recentes cadastradas no sistema.

**Parâmetros**: Nenhum

**Resposta de Sucesso (200 OK)**:
```json
[
  {
    "id": 10,
    "nome": "Spider-Man",
    "franquia": "Marvel",
    "fotoUrl": "https://exemplo.com/spiderman.jpg",
    "descricao": "Figura do Spider-Man",
    "anoLancamento": "2024",
    "ativo": true,
    "categoria": "Heróis",
    "colecao": {
      "id": 1,
      "titulo": "Heróis Marvel",
      "descricao": "Coleção de figuras dos Vingadores",
      "quantidade": 15,
      "figures": null
    }
  }
]
```

**Exemplo de Requisição**:
```bash
curl -X GET http://localhost:8080/action-figures/novidades
```

---

## 👤 Endpoints de Usuários

### 1. Registrar Novo Usuário
**Endpoint**: `POST /usuarios/registrar`

**Descrição**: Registra um novo usuário no sistema.

**Parâmetros**:
- **Corpo da Requisição (JSON)**:
```json
{
  "nomeUsuario": "joao123",
  "email": "joao@example.com",
  "senha": "senha123"
}
```

**Resposta de Sucesso (200 OK)**:
```json
{
  "id": 1,
  "nomeUsuario": "joao123",
  "email": "joao@example.com",
  "senha": "senha123"
}
```

**Resposta de Erro (400 Bad Request)**:
```json
{
  "timestamp": "2026-01-31T15:30:00.000+00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "E-mail já cadastrado"
}
```

**Exemplo de Requisição**:
```bash
curl -X POST http://localhost:8080/usuarios/registrar \
  -H "Content-Type: application/json" \
  -d '{
    "nomeUsuario": "joao123",
    "email": "joao@example.com",
    "senha": "senha123"
  }'
```

---

## 📊 Resumo dos Endpoints

| Método | Endpoint | Descrição | Parâmetros |
|--------|----------|-----------|------------|
| GET | `/colecoes/listar` | Listar todas as coleções | Nenhum |
| POST | `/colecoes/salvar` | Criar nova coleção | ColecaoRecord no corpo |
| GET | `/action-figures/listar` | Listar todas as figuras | Nenhum |
| GET | `/action-figures/{id}` | Buscar figura por ID | id (path) |
| GET | `/action-figures/buscar` | Buscar figuras por nome | termo (query) |
| GET | `/action-figures/colecao/{colecaoId}` | Buscar figuras por coleção | colecaoId (path) |
| GET | `/action-figures/franquia` | Buscar figuras por franquia | franquia (query) |
| GET | `/action-figures/novidades` | Listar 6 figuras mais recentes | Nenhum |
| POST | `/action-figures/salvar` | Criar nova figura | ActionFigureRecord no corpo |
| POST | `/action-figures/adicionar-existente` | Adicionar figura existente à coleção | figureId, colecaoId (query) |
| PUT | `/action-figures/{id}` | Atualizar figura existente | id (path) + ActionFigureRecord |
| DELETE | `/action-figures/{id}` | Remover figura da coleção | id (path) |
| DELETE | `/action-figures/{id}/definitivo` | Excluir figura do banco (Admin) | id (path) |
| POST | `/usuarios/registrar` | Registrar novo usuário | UsuarioRecord no corpo |

---

## 🔧 Códigos de Status HTTP

- **200 OK**: Requisição bem-sucedida
- **204 No Content**: Requisição bem-sucedida sem conteúdo no corpo
- **400 Bad Request**: Requisição malformada
- **404 Not Found**: Recurso não encontrado
- **500 Internal Server Error**: Erro interno no servidor

---

## 🧪 Exemplos de Fluxo Completo

### Fluxo 1: Criar Coleção e Adicionar Figuras

1. **Criar Coleção**:
```bash
curl -X POST http://localhost:8080/colecoes/salvar \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Animes Clássicos",
    "descricao": "Figuras de animes dos anos 90",
    "quantidade": 5,
    "usuarioId": 1
  }'
```

2. **Adicionar Figura à Coleção**:
```bash
curl -X POST http://localhost:8080/action-figures/salvar \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Goku",
    "franquia": "Dragon Ball",
    "fotoUrl": "https://exemplo.com/goku.jpg",
    "descricao": "Figura do Goku Super Saiyajin",
    "anoLancamento": "2023",
    "ativo": true,
    "categoria": "Animes",
    "colecaoId": 3
  }'
```

3. **Verificar Figuras da Coleção**:
```bash
curl -X GET http://localhost:8080/action-figures/colecao/3
```

### Fluxo 2: Buscar por Franquia

```bash
# Buscar todas as figuras Marvel
curl -X GET "http://localhost:8080/action-figures/franquia?franquia=Marvel"

# Buscar todas as figuras DC
curl -X GET "http://localhost:8080/action-figures/franquia?franquia=DC"
```

### Fluxo 3: Buscar por Nome

```bash
# Buscar figuras com "Ferro" no nome
curl -X GET "http://localhost:8080/action-figures/buscar?termo=Ferro"

# Buscar figuras com "homem" no nome (case insensitive)
curl -X GET "http://localhost:8080/action-figures/buscar?termo=homem"
```

### Fluxo 4: Adicionar Figura Existente a Outra Coleção

```bash
# Adicionar figura existente (ID=1) à coleção (ID=2)
curl -X POST "http://localhost:8080/action-figures/adicionar-existente?figureId=1&colecaoId=2"
```

### Fluxo 5: Ver Novidades

```bash
# Listar as 6 figuras mais recentes
curl -X GET http://localhost:8080/action-figures/novidades
```

---

## 🛡️ Validações e Tratamento de Erros

A API inclui validações importantes:

1. **Existência de Coleção**: Ao criar/atualizar uma figura, verifica se a coleção existe
2. **Existência de Figura**: Ao buscar/atualizar/deletar, verifica se a figura existe
3. **Respostas Consistentes**: Todas as respostas de erro seguem o padrão Spring Boot

---

## 📝 Notas Importantes

1. **Relacionamentos**: Ao deletar uma coleção, todas as figuras associadas também serão deletadas (cascade)
2. **IDs Autogerados**: Não é necessário informar IDs ao criar novos recursos
3. **URLs de Fotos**: O sistema armazena apenas as URLs, não as imagens
4. **Ordenação**: As listas retornam ordenadas por ID (crescente)

---

## 🚀 Como Testar

### Usando Postman/Insomnia:
1. Importe os endpoints acima
2. Configure o Content-Type como `application/json`
3. Use a base URL: `http://localhost:8080`

### Usando cURL:
Copie e cole os exemplos de comando cURL fornecidos para cada endpoint

### Usando Frontend:
Integre com qualquer framework frontend (React, Angular, Vue) usando fetch/axios

A API está pronta para uso e completamente documentada! 🎉
