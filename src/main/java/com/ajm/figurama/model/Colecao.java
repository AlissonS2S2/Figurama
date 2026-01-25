package com.ajm.figurama.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "colecoes")
public class Colecao {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String nome;
    
    @Column(length = 500)
    private String descricao;
    
    @Column(nullable = false, length = 20)
    private String visibilidade; // "PUBLICA" ou "PRIVADA"
    
    @Column(name = "colecionador_id", nullable = false)
    private Long colecionadorId;
    
    // Agora a coleção tem ITENS (que referenciam o catálogo)
    @OneToMany(mappedBy = "colecao", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<ItemColecao> itens = new ArrayList<>();
    
    // Método para adicionar item à coleção
    public void adicionarItem(ItemColecao item) {
        itens.add(item);
        item.setColecao(this);
    }
    
    // Método para remover item da coleção
    public void removerItem(ItemColecao item) {
        itens.remove(item);
        item.setColecao(null);
    }
}