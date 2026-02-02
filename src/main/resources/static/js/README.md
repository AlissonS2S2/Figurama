// ============================================
// README - ESTRUTURA ORGANIZADA DE JAVASCRIPT
// ============================================

Esta pasta contém todos os arquivos JavaScript consolidados e organizados do projeto Figurama.

## 📁 Estrutura de Arquivos

### 🗂️ Arquivos Principais
- **config.js** - Configurações globais (API_BASE_URL, etc)
- **api.js** - Integração completa com backend (CatalogoAPI, ColecaoAPI, ItemColecaoAPI)
- **auth.js** - Sistema de autenticação (login, registro, logout)
- **script.js** - Landing page (novedades, populares, pesquisa)

### 🗂️ Páginas Específicas
- **action_figure.js** - Detalhes de action figures
- **criando_colecao.js** - Formulário de criação de coleções
- **dashboard.js** - Dashboard do usuário
- **minha_colecao.js** - Visualização de coleções
- **app.js** - Funções administrativas e dashboard

## 🚀 Como Usar

### Ordem de Carregamento Recomendada:
1. **config.js** (sempre primeiro)
2. **api.js** (depende do config)
3. **auth.js** (opcional, para páginas protegidas)
4. **arquivo específico da página**

### Exemplo de inclusão em HTML:
```html
<!-- Configurações básicas -->
<script src="/js/consolidated/config.js"></script>
<script src="/js/consolidated/api.js"></script>

<!-- Autenticação (se necessário) -->
<script src="/js/consolidated/auth.js"></script>

<!-- Script da página -->
<script src="/js/consolidated/dashboard.js"></script>
```

## 📋 Resumo da Consolidação

### ✅ Arquivos Consolidados:
- Removidos duplicados entre `static/js` e `templates/js`
- Mantida apenas versão mais atual/completa de cada arquivo
- Centralizada dependência de CONFIG em arquivo único

### 🗑️ Arquivos Removidos:
- `templates/js/*.js` (duplicados)
- `static/js/config.js` (integrado no consolidated/config.js)

### 🔄 Benefícios:
- ✅ Manutenção simplificada
- ✅ Sem conflitos de versão
- ✅ Dependências claras
- ✅ Código organizado e legível

## 🛠️ Próximos Passos

1. Atualizar todos os HTMLs para usar novos caminhos
2. Remover pastas antigas após validação
3. Documentar APIs para desenvolvedores

---
*Consolidado em: 31/01/2026*
*Total de arquivos: 9 (antes: 34)*
