package com.ajm.figurama.controller;

import com.ajm.figurama.controller.rotas.RotaActionFigures;
import com.ajm.figurama.model.ActionFigureRecord;
import com.ajm.figurama.repository.ActionFigureEntity;
import com.ajm.figurama.service.ActionFigureService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(RotaActionFigures.ROOT)
@RequiredArgsConstructor
public class ActionFigureController {

    private final ActionFigureService service;

    @GetMapping(RotaActionFigures.LISTAR)
    public ResponseEntity<List<ActionFigureEntity>> listarTodos() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping(RotaActionFigures.BUSCAR_POR_ID)
    public ResponseEntity<ActionFigureEntity> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @GetMapping(RotaActionFigures.BUSCAR_POR_COLECAO)
    public ResponseEntity<List<ActionFigureEntity>> buscarPorColecao(@PathVariable Long colecaoId) {
        return ResponseEntity.ok(service.buscarPorColecao(colecaoId));
    }

    @GetMapping(RotaActionFigures.BUSCAR_POR_FRANQUIA)
    public ResponseEntity<List<ActionFigureEntity>> buscarPorFranquia(@RequestParam String franquia) {
        return ResponseEntity.ok(service.buscarPorFranquia(franquia));
    }

    @PostMapping(RotaActionFigures.SALVAR)
    public ResponseEntity<ActionFigureEntity> salvar(@RequestBody ActionFigureRecord dto) {
        return ResponseEntity.ok(service.salvar(dto));
    }

    @PutMapping(RotaActionFigures.ATUALIZAR)
    public ResponseEntity<ActionFigureEntity> atualizar(@PathVariable Long id, @RequestBody ActionFigureRecord dto) {
        return ResponseEntity.ok(service.atualizar(id, dto));
    }

    @DeleteMapping(RotaActionFigures.DELETAR)
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping(RotaActionFigures.NOVIDADES)
    public ResponseEntity<List<ActionFigureEntity>> buscarNovidades() {
        return ResponseEntity.ok(service.buscarNovidades());
    }
}
