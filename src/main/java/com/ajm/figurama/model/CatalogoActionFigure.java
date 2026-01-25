package com.ajm.figurama.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * Catálogo de Action Figures disponíveis no sistema
 * Estas são as figuras PRÉ-CADASTRADAS que o usuário pode adicionar à sua coleção
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "catalogo_action_figures")
public class CatalogoActionFigure {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String nome;
    
    @Column(length = 1000)
    private String descricao;
    
    @Column(nullable = false, length = 50)
    private String categoria; // Ex: "Marvel", "DC", "Anime"
    
    @Column(name = "url_foto", nullable = false, length = 500)
    private String urlFoto; // Caminho da imagem pré-cadastrada
    
    private Double precoSugerido;
    
    @Column(length = 100)
    private String fabricante;
    
    @Column(length = 50)
    private String anoLancamento;
    
    @Column(length = 50)
    private String escala; // Ex: "1/6", "1/12"
    
    @Column(nullable = false)
    private Boolean ativo = true; // Para desativar sem deletar
}