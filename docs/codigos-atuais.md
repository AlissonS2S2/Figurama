# Códigos Atuais - Figurama v4.0

**Atualizado:** 02/02/2026

## 🌐 WebController.java

```java
package com.ajm.figurama.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/explorar")
    public String pesquisar() {
        return "pesquisa";
    }

    @GetMapping("/dashboard")
    public String dashboard() {
        return "dashboard";
    }
}
```

## 📄 Templates

### index.html
```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>Figurama - Home</title>
    <link rel="stylesheet" th:href="@{/css/style.css}">
</head>
<body>
    <nav>
        <div class="logo"><h1>FIGURAMA</h1></div>
        <div>
            <a th:href="@{/}">Home</a>
            <a th:href="@{/explorar}">Explorar</a>
            <a th:href="@{/login}">Login</a>
        </div>
    </nav>

    <div class="container">
        <h2>🔥 Destaques do Catálogo</h2>
        <div id="catalog-grid" class="grid">
            <!-- JS carregará os itens aqui -->
        </div>
    </div>

    <script>
        async function loadCatalog() {
            const response = await fetch('/api/catalogo');
            const figures = await response.json();
            const grid = document.getElementById('catalog-grid');
            
            grid.innerHTML = figures.map(f => `
                <div class="card">
                    <img src="${f.urlFoto || 'https://via.placeholder.com/250'}" alt="${f.nome}">
                    <div class="card-body">
                        <h3>${f.nome}</h3>
                        <p>${f.franquia}</p>
                        <a href="/detalhes?id=${f.id}" class="btn">Ver Detalhes</a>
                    </div>
                </div>
            `).join('');
        }
        loadCatalog();
    </script>
</body>
</html>
```

## 🎨 CSS Principal

### style.css
```css
:root {
    --primary: #6c5ce7;
    --secondary: #a29bfe;
    --dark: #2d3436;
    --light: #dfe6e9;
    --danger: #ff7675;
    --bg: #1e272e;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: var(--bg);
    color: var(--light);
    margin: 0;
}

nav {
    background: var(--dark);
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 3px solid var(--primary);
}

nav a {
    color: white;
    text-decoration: none;
    margin-left: 1.5rem;
    font-weight: bold;
}

.container {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
}

.card {
    background: var(--dark);
    border-radius: 10px;
    overflow: hidden;
    transition: transform 0.3s;
    border: 1px solid #444;
}

.card:hover { transform: translateY(-5px); }

.card img {
    width: 100%;
    height: 250px;
    object-fit: cover;
}

.card-body { padding: 1rem; }

.btn {
    background: var(--primary);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
}

.btn-danger { background: var(--danger); }

input {
    padding: 0.8rem;
    border-radius: 5px;
    border: none;
    width: 100%;
    margin-bottom: 1rem;
}
```

## ⚙️ Configuração

### application.properties
```properties
# Configuração H2 em memória para desenvolvimento
spring.datasource.url=jdbc:h2:mem:figurama_db
spring.datasource.username=sa
spring.datasource.password=
spring.datasource.driver-class-name=org.h2.Driver

# Configuração do H2 Dialect
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect

# Use 'update' para criar tabelas
spring.jpa.hibernate.ddl-auto=update 
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# Habilitar console H2
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
```

## 🚀 Execução

```bash
.\mvnw.cmd spring-boot:run
```

Acessar: `http://localhost:8080`
