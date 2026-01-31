package com.ajm.figurama.repository;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ColecaoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private String descricao;
    private Integer quantidade;

    @OneToMany(mappedBy = "colecao", cascade = CascadeType.ALL)
    private List<ActionFigureEntity> figures;
}
