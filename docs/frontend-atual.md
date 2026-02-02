# Front-end Atual - Figurama v4.0

**Data:** 02/02/2026  
**Status:** Simplificado e funcional

## 📁 Estrutura

### Templates (4 arquivos)
- `index.html` - Página principal
- `login.html` - Login  
- `dashboard.html` - Painel
- `pesquisa.html` - Busca

### Static (1 arquivo)
- `css/style.css` - Estilos unificados

## 🌐 WebController

```java
@Controller
public class WebController {
    @GetMapping("/") → "index"
    @GetMapping("/login") → "login"  
    @GetMapping("/explorar") → "pesquisa"
    @GetMapping("/dashboard") → "dashboard"
}
```

## 🎨 CSS Principal

Variáveis:
- `--primary: #6c5ce7`
- `--dark: #2d3436` 
- `--bg: #1e272e`

## 🔧 Config H2

```properties
spring.datasource.url=jdbc:h2:mem:figurama_db
spring.h2.console.enabled=true
```

## 🚀 Executar

```bash
.\mvnw.cmd spring-boot:run
```

Acessar: `http://localhost:8080`
