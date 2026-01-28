package com.ajm.figurama.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // 1. Configuração de CORS (Liberar acesso à API)
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH") // Adicionei PATCH (importante para favoritar)
                .allowedHeaders("*");
    }

    // 2. Configuração de IMAGENS (O que faltava!)
    // Isso diz: "Quando alguém acessar /uploads/..., busque o arquivo na pasta 'uploads' na raiz do projeto"
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/");
    }
}