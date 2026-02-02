package com.ajm.figurama.model;

import jakarta.persistence.*;
import lombok.*;
import com.ajm.figurama.repository.ColecaoEntity;

@Entity
@Table(name = "catalogo_action_figures") // Nome exato da tabela no SQL
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ActionFigure {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nome;
    private String descricao;
    private String categoria;
    
    @Column(name = "url_foto") // Mapeia para a coluna do SQL
    private String urlFoto;
    
    private String franquia;
    
    @Column(name = "ano_lancamento")
    private String anoLancamento;
    
    private Boolean ativo = true;

    @ManyToOne
    @JoinColumn(name = "colecao_id")
    private ColecaoEntity colecao;
}