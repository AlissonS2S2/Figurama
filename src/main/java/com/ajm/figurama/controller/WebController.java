package com.ajm.figurama.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    // --- Páginas Públicas (Redirecionando para arquivos estáticos) ---

    @GetMapping("/")
    public String home() {
        return "forward:/index.html"; // Redireciona para o arquivo estático
    }

    @GetMapping("/login")
    public String login() {
        return "forward:/pages/login.html";
    }

    @GetMapping("/cadastro")
    public String cadastro() {
        return "forward:/pages/register.html";
    }

    @GetMapping("/explorar")
    public String pesquisar() {
        return "forward:/pages/pesquisa.html";
    }
    
    @GetMapping("/franquias")
    public String franquia() {
        return "forward:/pages/franquia.html";
    }
    
    @GetMapping("/suporte")
    public String suporte() {
        return "forward:/pages/support.html";
    }

    // --- Páginas que exigem um ID (Detalhes) ---

    @GetMapping("/detalhes")
    public String detalhesActionFigure() {
        return "forward:/pages/action_figure.html"; 
    }

    // --- Páginas Privadas (Dashboard/Coleção) ---

    @GetMapping("/dashboard")
    public String dashboard() {
        return "forward:/pages/dashboard.html"; 
    }

    @GetMapping("/minha-colecao")
    public String minhaColecao() {
        return "forward:/pages/minha_colecao.html"; 
    }

    @GetMapping("/criar-colecao")
    public String criarColecao() {
        return "forward:/pages/criando_colecao.html"; 
    }
}