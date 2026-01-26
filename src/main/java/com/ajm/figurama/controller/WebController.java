package com.ajm.figurama.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class WebController {

    // --- Páginas Públicas ---

    @GetMapping("/")
    public String home() {
        return "index"; // Abre src/main/resources/templates/index.html
    }

    @GetMapping("/login")
    public String login() {
        return "pages/login"; // Abre src/main/resources/templates/pages/login.html
    }

    @GetMapping("/cadastro")
    public String cadastro() {
        return "pages/register"; // Abre src/main/resources/templates/pages/register.html
    }

    @GetMapping("/explorar")
    public String pesquisar() {
        return "pages/pesquisa"; // Abre src/main/resources/templates/pages/pesquisa.html
    }
    
    @GetMapping("/franquias")
    public String franquia() {
        return "pages/franquia"; // Abre src/main/resources/templates/pages/franquia.html
    }
    
    @GetMapping("/suporte")
    public String suporte() {
        return "pages/support"; // Abre src/main/resources/templates/pages/support.html
    }

    // --- Páginas que exigem um ID (Detalhes) ---

    @GetMapping("/detalhes")
    public String detalhesActionFigure() {
        // Não precisamos receber o ID aqui no Java se o JavaScript da página
        // for pegar o ID da URL (ex: /detalhes?id=1).
        // Apenas retornamos o HTML e o JS faz o resto.
        return "pages/action_figure"; 
    }

    // --- Páginas Privadas (Dashboard/Coleção) ---
    // (Futuramente você pode adicionar verificação de login aqui)

    @GetMapping("/dashboard")
    public String dashboard() {
        return "pages/dashboard"; 
    }

    @GetMapping("/minha-colecao")
    public String minhaColecao() {
        return "pages/minha_colecao"; 
    }

    @GetMapping("/criar-colecao")
    public String criarColecao() {
        return "pages/criando_colecao"; 
    }
}