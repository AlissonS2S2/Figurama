package com.ajm.figurama.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "colecoes")
public class Colecao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    private String descricao;

    @Column(nullable = false)
    private String visibilidade; // "PUBLICA" ou "PRIVADA"

    @Column(nullable = false)
    private Long colecionadorId;

    @OneToMany(mappedBy = "colecao", cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<ActionFigure> actionFigures = new ArrayList<>();

    public void adicionarActionFigure(ActionFigure af) {
        actionFigures.add(af);
        af.setColecao(this);
    }

    public void removerActionFigure(ActionFigure af) {
        actionFigures.remove(af);
        af.setColecao(null);
    }
}
