package com.ajm.figurama.repository;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "catalogo_action_figures")
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor

public class ActionFigureEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private String nome;
    private String descricao;
    private Boolean ativo;
    private String categoria;

    @Column(name = "ano_lancamento")
    private String anoLancamento;

    private String franquia;

    @Column(name = "url_foto")
    private String urlFoto;

    @ManyToOne
    @JoinColumn(name = "colecao_id")
    @JsonIgnore
    private ColecaoEntity colecao;
}
