package com.ajm.figurama.model;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Data
@Table(name = "action_figures")
public class ActionFigure {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    private String descricao;

    @Column(nullable = false)
    private String categoria; // Ex: "Marvel", "DC", "Anime"

    private String urlFoto;

    private Double preco;

    private String fabricante;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "colecao_id")
    @JsonIgnore
    private Colecao colecao;
}