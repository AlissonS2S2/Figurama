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

    @GetMapping("/explorar")
    public String pesquisar() {
        return "pesquisa"; // Busca /templates/pesquisa.html
    }

    // --- Páginas Privadas (Dashboard/Coleção) ---

    @GetMapping("/dashboard")
    public String dashboard() {
        return "dashboard"; // Busca /templates/dashboard.html
    }
}