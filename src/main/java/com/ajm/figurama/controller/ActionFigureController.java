package com.ajm.figurama.controller;

import com.ajm.figurama.model.ActionFigure;
import com.ajm.figurama.service.ActionFigureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/action-figures")
@CrossOrigin(origins = "*")
public class ActionFigureController {

    @Autowired
    private ActionFigureService actionFigureService;

    // GET - Listar todas as action figures
    @GetMapping
    public ResponseEntity<List<ActionFigure>> listarTodas() {
        List<ActionFigure> figures = actionFigureService.listarTodas();
        return ResponseEntity.ok(figures);
    }

    // GET - Buscar action figure por ID
    @GetMapping("/{id}")
    public ResponseEntity<ActionFigure> buscarPorId(@PathVariable Long id) {
        return actionFigureService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST - Cadastrar nova action figure
    @PostMapping
    public ResponseEntity<ActionFigure> cadastrar(
            @RequestBody ActionFigure actionFigure
    ) {
        ActionFigure novaFigure = actionFigureService.salvar(actionFigure);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(novaFigure);
    }

    // DELETE - Remover action figure
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        if (actionFigureService.buscarPorId(id).isPresent()) {
            actionFigureService.deletar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // Endpoint adicional: Buscar por categoria
    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<ActionFigure>> buscarPorCategoria(
            @PathVariable String categoria
    ) {
        List<ActionFigure> figures =
                actionFigureService.buscarPorCategoria(categoria);
        return ResponseEntity.ok(figures);
    }
}
