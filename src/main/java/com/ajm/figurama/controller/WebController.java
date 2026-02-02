package com.ajm.figurama.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    // --- Páginas Públicas (Usando Thymeleaf Templates) ---

    @GetMapping("/")
    public String home() {
        return "index"; // Busca /templates/index.html
    }

    @GetMapping("/login")
    public String login() {
        return "login"; // Busca /templates/login.html
    }

    @GetMapping("/cadastro")
    public String cadastro() {
        return "cadastro"; // Busca /templates/cadastro.html
    }

    @GetMapping("/explorar")
    public String pesquisar() {
        return "pesquisa"; // Busca /templates/pesquisa.html
    }

    @GetMapping("/franquias")
    public String franquias() {
        return "franquias"; // Busca /templates/franquias.html
    }

    @GetMapping("/suporte")
    public String suporte() {
        return "suporte"; // Busca /templates/suporte.html
    }

    @GetMapping("/detalhes")
    public String detalhes() {
        return "detalhes"; // Busca /templates/detalhes.html
    }

    // --- Páginas Privadas (Dashboard/Coleção) ---

    @GetMapping("/dashboard")
    public String dashboard() {
        return "dashboard"; // Busca /templates/dashboard.html
    }

    @GetMapping("/minha-colecao")
    public String minhaColecao() {
        return "minha_colecao"; // Busca /templates/minha_colecao.html
    }

    @GetMapping("/criar-colecao")
    public String criarColecao() {
        return "criando_colecao"; // Busca /templates/criando_colecao.html
    }
}