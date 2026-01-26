package com.ajm.figurama.service;

import com.ajm.figurama.model.Usuario;
import com.ajm.figurama.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    // ========================================
    // REGISTRAR NOVO USUÁRIO
    // ========================================
    
    public Usuario registrar(Usuario usuario) {
        // Em produção, fazer hash da senha com BCrypt
        // usuario.setPassword(new BCryptPasswordEncoder().encode(usuario.getPassword()));
        
        usuario.setAtivo(true);
        usuario.setDataCriacao(LocalDateTime.now());
        usuario.setUltimoAcesso(LocalDateTime.now());
        
        return usuarioRepository.save(usuario);
    }
    
    // ========================================
    // LOGIN
    // ========================================
    
    public Optional<Usuario> login(String usernameOrEmail, String password) {
        // Buscar usuário por username ou email
        Optional<Usuario> usuarioOpt = usuarioRepository.findByUsernameOrEmail(
            usernameOrEmail, 
            usernameOrEmail
        );
        
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            
            // Verificar senha
            // Em produção, usar BCrypt:
            // if (new BCryptPasswordEncoder().matches(password, usuario.getPassword()))
            
            if (usuario.getPassword().equals(password)) {
                // Atualizar último acesso
                usuario.setUltimoAcesso(LocalDateTime.now());
                usuarioRepository.save(usuario);
                
                return Optional.of(usuario);
            }
        }
        
        return Optional.empty();
    }
    
    // ========================================
    // BUSCAR POR ID
    // ========================================
    
    public Optional<Usuario> buscarPorId(Long id) {
        return usuarioRepository.findById(id);
    }
    
    // ========================================
    // BUSCAR POR USERNAME
    // ========================================
    
    public Optional<Usuario> buscarPorUsername(String username) {
        return usuarioRepository.findByUsername(username);
    }
    
    // ========================================
    // BUSCAR POR EMAIL
    // ========================================
    
    public Optional<Usuario> buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }
    
    // ========================================
    // VERIFICAÇÕES
    // ========================================
    
    public boolean existePorUsername(String username) {
        return usuarioRepository.existsByUsername(username);
    }
    
    public boolean existePorEmail(String email) {
        return usuarioRepository.existsByEmail(email);
    }
    
    // ========================================
    // ATUALIZAR PERFIL
    // ========================================
    
    public Optional<Usuario> atualizarPerfil(Long id, Usuario dadosAtualizados) {
        return usuarioRepository.findById(id)
            .map(usuario -> {
                if (dadosAtualizados.getNomeCompleto() != null) {
                    usuario.setNomeCompleto(dadosAtualizados.getNomeCompleto());
                }
                if (dadosAtualizados.getEmail() != null && 
                    !dadosAtualizados.getEmail().equals(usuario.getEmail())) {
                    // Verificar se novo email já existe
                    if (!existePorEmail(dadosAtualizados.getEmail())) {
                        usuario.setEmail(dadosAtualizados.getEmail());
                    }
                }
                if (dadosAtualizados.getFotoPerfil() != null) {
                    usuario.setFotoPerfil(dadosAtualizados.getFotoPerfil());
                }
                // Não permitir alterar username e password aqui
                
                return usuarioRepository.save(usuario);
            });
    }
    
    // ========================================
    // DESATIVAR USUÁRIO
    // ========================================
    
    public boolean desativar(Long id) {
        return usuarioRepository.findById(id)
            .map(usuario -> {
                usuario.setAtivo(false);
                usuarioRepository.save(usuario);
                return true;
            })
            .orElse(false);
    }
}