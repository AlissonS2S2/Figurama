package com.ajm.figurama.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Long> {
    boolean existsByEmail(String email);
    boolean existsByNomeUsuario(String nomeUsuario);
    Optional<UsuarioEntity> findByNomeUsuarioAndSenha(String nomeUsuario, String senha);
    Optional<UsuarioEntity> findByEmail(String email);
}
