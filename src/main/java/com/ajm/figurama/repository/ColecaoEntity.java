package com.ajm.figurama.repository;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;
import org.hibernate.annotations.Formula;

@Entity
@Table(name = "colecoes") // Garante que usa a tabela certa
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ColecaoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome") // <--- AQUI ESTÁ A MÁGICA
    private String titulo;

    private String descricao;
    
    @Formula("(SELECT COUNT(*) FROM catalogo_action_figures f WHERE f.colecao_id = id)")
    private Integer quantidade;

    @OneToMany(mappedBy = "colecao", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<ActionFigureEntity> figures;

    @ManyToOne
    @JoinColumn(name = "colecionador_id") // Confirmando o nome que usamos no script
    private UsuarioEntity usuario;

    @CreationTimestamp // O Hibernate preenche isso na primeira vez que salva
    @Column(updatable = false) // Garante que a data de criação nunca mude
    private LocalDateTime dataCriacao;

    @UpdateTimestamp // O Hibernate atualiza isso TODA vez que você mexer na coleção
    private LocalDateTime dataAtualizacao;
}