package com.ajm.figurama.repository;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "usuarios")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class UsuarioEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", unique = true)
    private String nomeUsuario;
    
    @Column(unique = true)
    private String email;
    
    @Column(name = "password")
    private String senha;
}