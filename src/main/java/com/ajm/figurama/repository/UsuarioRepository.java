package com.ajm.figurama.repository;

import com.ajm.figurama.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    // Buscar por username
    Optional<Usuario> findByUsername(String username);
    
    // Buscar por email
    Optional<Usuario> findByEmail(String email);
    
    // Buscar por username ou email
    Optional<Usuario> findByUsernameOrEmail(String username, String email);
    
    // Verificar se username existe
    boolean existsByUsername(String username);
    
    // Verificar se email existe
    boolean existsByEmail(String email);
    
    // Buscar usuários ativos
    Optional<Usuario> findByUsernameAndAtivoTrue(String username);
}