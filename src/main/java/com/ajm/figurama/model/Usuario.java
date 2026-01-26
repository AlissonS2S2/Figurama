package com.ajm.figurama.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "usuarios")
public class Usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true, length = 50)
    private String username;
    
    @Column(nullable = false, unique = true, length = 100)
    private String email;
    
    @Column(nullable = false, length = 255)
    private String password; // Em produção, use BCrypt para hash
    
    @Column(name = "nome_completo", length = 100)
    private String nomeCompleto;
    
    @Column(name = "foto_perfil", length = 500)
    private String fotoPerfil;
    
    @Column(name = "data_criacao")
    private LocalDateTime dataCriacao;
    
    @Column(name = "ultimo_acesso")
    private LocalDateTime ultimoAcesso;
    
    @Column(nullable = false)
    private Boolean ativo = true;
    
    @PrePersist
    public void prePersist() {
        if (dataCriacao == null) {
            dataCriacao = LocalDateTime.now();
        }
        if (ultimoAcesso == null) {
            ultimoAcesso = LocalDateTime.now();
        }
    }
    
    @PreUpdate
    public void preUpdate() {
        ultimoAcesso = LocalDateTime.now();
    }
}