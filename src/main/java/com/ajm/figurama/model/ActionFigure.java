package com.ajm.figurama.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "action_figures")
public class ActionFigure {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String nome;
    
    @Column(length = 1000)
    private String descricao;
    
    @Column(nullable = false, length = 50)
    private String categoria; // Ex: "Marvel", "DC", "Anime"
    
    @Column(name = "url_foto", length = 500)
    private String urlFoto;
    
    private Double preco;
    
    @Column(length = 100)
    private String fabricante;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "colecao_id", nullable = true)
    @JsonIgnore
    private Colecao colecao;
}