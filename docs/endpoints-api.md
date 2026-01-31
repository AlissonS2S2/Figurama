# 📚 Documentação Completa dos Endpoints API - Projeto Figurama

Este documento descreve todos os endpoints REST disponíveis na API do projeto Figurama, incluindo métodos, parâmetros, respostas e exemplos de uso.

---

## 🌐 Informações Gerais da API

- **Base URL**: `http://localhost:8080`
- **Content-Type**: `application/json`
- **Métodos HTTP**: GET, POST, PUT, DELETE
- **Respostas**: JSON com status HTTP apropriados

---

## 📋 Endpoints de Coleções

### 1. Listar Todas as Coleções
**Endpoint**: `GET /colecoes/listar`

**Descrição**: Retorna uma lista com todas as coleções cadastradas no sistema.

**Parâmetros**: Nenhum

**Resposta de Sucesso (200 OK)**:
```json
[
  {
    "id": 1,
    "titulo": "Heróis Marvel",
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

### 3. Buscar Action Figures por Coleção
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

### 4. Buscar Action Figures por Franquia
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

### 5. Salvar Nova Action Figure
**Endpoint**: `POST /action-figures/salvar`

**Descrição**: Cria uma nova figura de ação no sistema.

**Parâmetros**:
- **Corpo da Requisição (JSON)**:
```json
{
  "nome": "Batman",
  "franquia": "DC",
  "fotoUrl": "https://exemplo.com/batman.jpg",
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
    "colecaoId": 2
  }'
```

---

### 6. Atualizar Action Figure
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
    "colecaoId": 1
  }'
```

---

### 7. Deletar Action Figure
**Endpoint**: `DELETE /action-figures/{id}`

**Descrição**: Remove uma figura de ação do sistema.

**Parâmetros**:
- **Path Parameter**: `id` (Long) - ID da figura de ação a ser deletada

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

## 📊 Resumo dos Endpoints

| Método | Endpoint | Descrição | Parâmetros |
|--------|----------|-----------|------------|
| GET | `/colecoes/listar` | Listar todas as coleções | Nenhum |
| POST | `/colecoes/salvar` | Criar nova coleção | ColecaoRecord no corpo |
| GET | `/action-figures/listar` | Listar todas as figuras | Nenhum |
| GET | `/action-figures/{id}` | Buscar figura por ID | id (path) |
| GET | `/action-figures/colecao/{colecaoId}` | Buscar figuras por coleção | colecaoId (path) |
| GET | `/action-figures/franquia` | Buscar figuras por franquia | franquia (query) |
| POST | `/action-figures/salvar` | Criar nova figura | ActionFigureRecord no corpo |
| PUT | `/action-figures/{id}` | Atualizar figura existente | id (path) + ActionFigureRecord |
| DELETE | `/action-figures/{id}` | Deletar figura | id (path) |

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
    "quantidade": 5
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
