package com.ajm.figurama.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ajm.figurama.model.UsuarioRecord;
import com.ajm.figurama.repository.UsuarioEntity;
import com.ajm.figurama.repository.UsuarioRepository;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/usuarios")
@RequiredArgsConstructor
public class UsuarioController {
    private final UsuarioRepository repository;

    @PostMapping("/registrar")
    public ResponseEntity<?> registrar(@RequestBody UsuarioRecord dto) {
        if(repository.existsByEmail(dto.email())) {
            return ResponseEntity.badRequest().body("E-mail já cadastrado");
        }

        UsuarioEntity novo = UsuarioEntity.builder()
                .nomeUsuario(dto.nomeUsuario())
                .email(dto.email())
                .senha(dto.senha()) // Em um projeto real, usaríamos criptografia aqui
                .build();
        
        repository.save(novo);
        return ResponseEntity.ok("Usuário registrado");
    }

    @GetMapping("/listar")
    public ResponseEntity<List<UsuarioEntity>> listarTodos() {
        return ResponseEntity.ok(repository.findAll());
    }
}
