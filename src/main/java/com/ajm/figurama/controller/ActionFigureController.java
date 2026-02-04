package com.ajm.figurama.controller;

import com.ajm.figurama.controller.rotas.RotaActionFigures;
import com.ajm.figurama.model.ActionFigureRecord;
import com.ajm.figurama.model.dto.ActionFigureDTO;
import com.ajm.figurama.repository.ActionFigureEntity;
import com.ajm.figurama.service.ActionFigureService;
import com.ajm.figurama.model.dto.mapper.ActionFigureMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(RotaActionFigures.ROOT)
@RequiredArgsConstructor
public class ActionFigureController {

    private final ActionFigureService service;
    private final ActionFigureMapper mapper;

    @GetMapping(RotaActionFigures.LISTAR)
    public ResponseEntity<List<ActionFigureEntity>> listarTodos() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/com-colecao")
    public ResponseEntity<List<ActionFigureDTO>> listarComColecao() {
        List<ActionFigureEntity> entities = service.listarTodos();
        List<ActionFigureDTO> dtos = entities.stream()
                .map(mapper::toActionFigureDTO)
                .toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping(RotaActionFigures.BUSCAR_POR_ID)
    public ResponseEntity<ActionFigureEntity> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @GetMapping(RotaActionFigures.BUSCAR_POR_NOME)
    public ResponseEntity<List<ActionFigureEntity>> buscarPorNome(@RequestParam String termo) {
        return ResponseEntity.ok(service.buscarPorNome(termo));
    }

    @PostMapping("/adicionar-existente")
    public ResponseEntity<ActionFigureEntity> adicionarExistente(
            @RequestParam Long figureId, 
            @RequestParam Long colecaoId) {
        
        return ResponseEntity.ok(service.adicionarDaBusca(figureId, colecaoId));
    }

    // Mantém o DELETE normal para o usuário remover da estante
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removerDaColecao(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }

    // NOVO: Endpoint para excluir action figure de uma coleção específica
    @DeleteMapping("/{figureId}/da-colecao/{colecaoId}")
    public ResponseEntity<Void> removerFiguraDaColecao(
            @PathVariable Long figureId, 
            @PathVariable Long colecaoId) {
        try {
            service.removerFiguraDaColecao(figureId, colecaoId);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // NOVO: DELETE para apagar do banco (Admin)
    @DeleteMapping("/{id}/definitivo")
    public ResponseEntity<Void> excluirDoBanco(@PathVariable Long id) {
        service.excluirDoCatalogo(id);
        return ResponseEntity.noContent().build();
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
    
    @GetMapping(RotaActionFigures.NOVIDADES)
    public ResponseEntity<List<ActionFigureEntity>> buscarNovidades() {
        return ResponseEntity.ok(service.buscarNovidades());
    }
}
