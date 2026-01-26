package com.ajm.figurama.controller;

import com.ajm.figurama.model.Usuario;
import com.ajm.figurama.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {
    
    @Autowired
    private UsuarioService usuarioService;
    
    // ========================================
    // REGISTRO DE NOVO USUÁRIO
    // ========================================
    
    @PostMapping("/registrar")
    public ResponseEntity<?> registrar(@RequestBody Usuario usuario) {
        try {
            // Validar dados
            if (usuario.getUsername() == null || usuario.getUsername().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(criarResposta(false, "Nome de usuário é obrigatório", null));
            }
            
            if (usuario.getEmail() == null || usuario.getEmail().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(criarResposta(false, "Email é obrigatório", null));
            }
            
            if (usuario.getPassword() == null || usuario.getPassword().length() < 6) {
                return ResponseEntity.badRequest()
                    .body(criarResposta(false, "Senha deve ter no mínimo 6 caracteres", null));
            }
            
            // Verificar se username já existe
            if (usuarioService.existePorUsername(usuario.getUsername())) {
                return ResponseEntity.badRequest()
                    .body(criarResposta(false, "Nome de usuário já está em uso", null));
            }
            
            // Verificar se email já existe
            if (usuarioService.existePorEmail(usuario.getEmail())) {
                return ResponseEntity.badRequest()
                    .body(criarResposta(false, "Email já está cadastrado", null));
            }
            
            // Criar usuário
            Usuario novoUsuario = usuarioService.registrar(usuario);
            
            // Remover senha da resposta
            novoUsuario.setPassword(null);
            
            return ResponseEntity.status(HttpStatus.CREATED)
                .body(criarResposta(true, "Usuário registrado com sucesso", novoUsuario));
                
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(criarResposta(false, "Erro ao registrar usuário: " + e.getMessage(), null));
        }
    }
    
    // ========================================
    // LOGIN DE USUÁRIO
    // ========================================
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        try {
            String username = credentials.get("username");
            String password = credentials.get("password");
            
            if (username == null || username.trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(criarResposta(false, "Nome de usuário ou email é obrigatório", null));
            }
            
            if (password == null || password.trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(criarResposta(false, "Senha é obrigatória", null));
            }
            
            // Tentar fazer login
            Optional<Usuario> usuarioOpt = usuarioService.login(username, password);
            
            if (usuarioOpt.isPresent()) {
                Usuario usuario = usuarioOpt.get();
                
                // Remover senha da resposta
                usuario.setPassword(null);
                
                // Criar resposta com token (mock - em produção use JWT)
                Map<String, Object> data = new HashMap<>();
                data.put("usuario", usuario);
                data.put("token", "mock-token-" + System.currentTimeMillis());
                
                return ResponseEntity.ok()
                    .body(criarResposta(true, "Login realizado com sucesso", data));
                    
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(criarResposta(false, "Usuário ou senha incorretos", null));
            }
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(criarResposta(false, "Erro ao fazer login: " + e.getMessage(), null));
        }
    }
    
    // ========================================
    // BUSCAR USUÁRIO POR ID
    // ========================================
    
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        Optional<Usuario> usuario = usuarioService.buscarPorId(id);
        
        if (usuario.isPresent()) {
            Usuario user = usuario.get();
            user.setPassword(null); // Remover senha
            return ResponseEntity.ok(user);
        }
        
        return ResponseEntity.notFound().build();
    }
    
    // ========================================
    // ATUALIZAR PERFIL
    // ========================================
    
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarPerfil(@PathVariable Long id, @RequestBody Usuario dadosAtualizados) {
        try {
            Optional<Usuario> usuarioAtualizado = usuarioService.atualizarPerfil(id, dadosAtualizados);
            
            if (usuarioAtualizado.isPresent()) {
                Usuario user = usuarioAtualizado.get();
                user.setPassword(null);
                return ResponseEntity.ok()
                    .body(criarResposta(true, "Perfil atualizado com sucesso", user));
            }
            
            // Correção: Use status(HttpStatus.NOT_FOUND) em vez de notFound()
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(criarResposta(false, "Usuário não encontrado", null));
                
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(criarResposta(false, "Erro ao atualizar perfil: " + e.getMessage(), null));
        }
    }
    
    // ========================================
    // MÉTODO AUXILIAR PARA CRIAR RESPOSTAS
    // ========================================
    
    private Map<String, Object> criarResposta(boolean sucesso, String mensagem, Object data) {
        Map<String, Object> resposta = new HashMap<>();
        resposta.put("sucesso", sucesso);
        resposta.put("mensagem", mensagem);
        if (data != null) {
            resposta.put("data", data);
        }
        return resposta;
    }
}