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

    @PutMapping("/{id}")
    public ResponseEntity<ColecaoEntity> atualizar(@PathVariable Long id, @RequestBody ColecaoRecord dto) {
        try {
            System.out.println("=== DEBUG ATUALIZAR COLEÇÃO ===");
            System.out.println("ID: " + id);
            System.out.println("DTO: " + dto);
            System.out.println("Título: " + dto.titulo());
            System.out.println("Descrição: " + dto.descricao());
            System.out.println("UsuarioId: " + dto.usuarioId());
            
            ColecaoEntity colecaoAtualizada = service.atualizar(id, dto);
            System.out.println("Coleção atualizada com sucesso: " + colecaoAtualizada.getTitulo());
            
            return ResponseEntity.ok(colecaoAtualizada);
        } catch (RuntimeException e) {
            System.err.println("Erro ao atualizar coleção: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/{colecaoId}/adicionar-figuras")
    public ResponseEntity<ColecaoEntity> adicionarFiguras(
            @PathVariable Long colecaoId, 
            @RequestBody List<Long> figureIds) {
        try {
            ColecaoEntity colecaoAtualizada = service.adicionarFigurasAColecao(colecaoId, figureIds);
            return ResponseEntity.ok(colecaoAtualizada);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        try {
            service.deletar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}