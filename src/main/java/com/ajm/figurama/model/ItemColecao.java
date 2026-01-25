package com.ajm.figurama.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDateTime;

/**
 * Representa uma Action Figure do catálogo que foi adicionada à coleção de um usuário
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "itens_colecao")
public class ItemColecao {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    // Referência à action figure do catálogo
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "catalogo_action_figure_id", nullable = false)
    private CatalogoActionFigure actionFigure;
    
    // Coleção à qual pertence
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "colecao_id", nullable = false)
    @JsonIgnore
    private Colecao colecao;
    
    // Informações personalizadas do usuário sobre este item
    @Column(length = 1000)
    private String observacoes; // Ex: "Comprei em 2020", "Edição limitada"
    
    private Double precoCompra; // Quanto o usuário pagou
    
    @Column(length = 50)
    private String estado; // Ex: "Novo", "Usado", "Lacrado"
    
    @Column(name = "data_adicao")
    private LocalDateTime dataAdicao;
    
    @Column(name = "favorito")
    private Boolean favorito = false;
    
    @PrePersist
    public void prePersist() {
        if (dataAdicao == null) {
            dataAdicao = LocalDateTime.now();
        }
    }
}