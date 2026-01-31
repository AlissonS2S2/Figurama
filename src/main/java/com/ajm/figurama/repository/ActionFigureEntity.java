package com.ajm.figurama.repository;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "action_figure")
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor

public class ActionFigureEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String franquia;
    private String fotoUrl;

    @ManyToOne
    @JoinColumn(name = "colecao_id")
    private ColecaoEntity colecao;
}
