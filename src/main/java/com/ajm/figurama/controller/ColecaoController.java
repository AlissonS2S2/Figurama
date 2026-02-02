package com.ajm.figurama.controller;

import com.ajm.figurama.controller.rotas.RotaColecoes;
import com.ajm.figurama.model.ColecaoRecord;
import com.ajm.figurama.repository.ColecaoEntity;
import com.ajm.figurama.service.ColecaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Usamos RestController para trabalhar com JSON
@RequestMapping(RotaColecoes.ROOT)
@RequiredArgsConstructor
public class ColecaoController {

    private final ColecaoService service;

    @GetMapping(RotaColecoes.LISTAR)
    public ResponseEntity<List<ColecaoEntity>> listar() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @PostMapping(RotaColecoes.SALVAR)
    public ResponseEntity<ColecaoEntity> salvar(@RequestBody ColecaoRecord dto) {
        return ResponseEntity.ok(service.salvar(dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}