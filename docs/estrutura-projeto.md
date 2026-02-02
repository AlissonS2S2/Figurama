# Estrutura do Projeto Figurama - v4.0

**Atualizado:** 02/02/2026

## 📁 Diretórios Principais

```
Figurama/
├── src/main/java/com/ajm/figurama/
│   ├── controller/
│   │   ├── WebController.java ✅
│   │   ├── UsuarioController.java ✅
│   │   └── CatalogoController.java ✅
│   ├── service/
│   ├── repository/
│   ├── model/
│   └── config/
├── src/main/resources/
│   ├── templates/
│   │   ├── index.html ✅
│   │   ├── login.html ✅
│   │   ├── dashboard.html ✅
│   │   └── pesquisa.html ✅
│   ├── static/
│   │   └── css/
│   │       └── style.css ✅
│   └── application.properties ✅ (H2)
├── docs/
│   ├── frontend-atual.md ✅
│   └── estrutura-projeto.md ✅
├── target/ (limpo)
└── pom.xml ✅
```

## 🎯 Front-end Simplificado

- **4 templates** Thymeleaf
- **1 CSS** unificado  
- **WebController** com 4 endpoints
- **H2** para desenvolvimento

## 🚀 Como Usar

1. `.\mvnw.cmd spring-boot:run`
2. Acessar `http://localhost:8080`
3. Console H2: `http://localhost:8080/h2-console`

## ✅ Status

- Front-end: **Funcional**
- Back-end: **Completo** 
- Banco: **H2 configurado**
- Target: **Limpo**
