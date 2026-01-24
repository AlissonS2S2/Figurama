package com.ajm.figurama.controller;

import com.ajm.figurama.model.ItemColecao;
import com.ajm.figurama.service.ItemColecaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller para o USUÁRIO gerenciar os itens da SUA coleção
 * O usuário adiciona action figures do catálogo à sua coleção
 */
@RestController
@RequestMapping("/api/colecoes/{colecaoId}/itens")
@CrossOrigin(origins = "*")
public class ItemColecaoController {
    
    @Autowired
    private ItemColecaoService itemColecaoService;
    
    // GET - Listar todos os itens de uma coleção
    @GetMapping
    public ResponseEntity<List<ItemColecao>> listarItens(@PathVariable Long colecaoId) {
        List<ItemColecao> itens = itemColecaoService.listarItensDaColecao(colecaoId);
        return ResponseEntity.ok(itens);
    }
    
    // GET - Buscar item específico
    @GetMapping("/{itemId}")
    public ResponseEntity<ItemColecao> buscarItem(@PathVariable Long colecaoId, @PathVariable Long itemId) {
        return itemColecaoService.buscarPorId(itemId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // POST - Adicionar action figure do catálogo à coleção
    @PostMapping("/adicionar/{actionFigureId}")
    public ResponseEntity<?> adicionarItem(
            @PathVariable Long colecaoId,
            @PathVariable Long actionFigureId,
            @RequestBody(required = false) ItemColecao detalhes) {
        
        try {
            ItemColecao novoItem = itemColecaoService.adicionarItemNaColecao(
                    colecaoId, 
                    actionFigureId, 
                    detalhes
            );
            return ResponseEntity.status(HttpStatus.CREATED).body(novoItem);
            
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    
    // PUT - Atualizar informações personalizadas do item
    @PutMapping("/{itemId}")
    public ResponseEntity<ItemColecao> atualizarItem(
            @PathVariable Long colecaoId,
            @PathVariable Long itemId,
            @RequestBody ItemColecao dadosAtualizados) {
        
        try {
            ItemColecao itemAtualizado = itemColecaoService.atualizarItem(itemId, dadosAtualizados);
            return ResponseEntity.ok(itemAtualizado);
            
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // DELETE - Remover item da coleção
    @DeleteMapping("/{itemId}")
    public ResponseEntity<Void> removerItem(@PathVariable Long colecaoId, @PathVariable Long itemId) {
        itemColecaoService.removerItem(itemId);
        return ResponseEntity.noContent().build();
    }
    
    // GET - Listar apenas favoritos
    @GetMapping("/favoritos")
    public ResponseEntity<List<ItemColecao>> listarFavoritos(@PathVariable Long colecaoId) {
        List<ItemColecao> favoritos = itemColecaoService.listarFavoritos(colecaoId);
        return ResponseEntity.ok(favoritos);
    }
    
    // GET - Contar itens da coleção
    @GetMapping("/contar")
    public ResponseEntity<Long> contarItens(@PathVariable Long colecaoId) {
        Long total = itemColecaoService.contarItens(colecaoId);
        return ResponseEntity.ok(total);
    }
    
    // PATCH - Marcar/desmarcar como favorito
    @PatchMapping("/{itemId}/favorito")
    public ResponseEntity<ItemColecao> toggleFavorito(
            @PathVariable Long colecaoId,
            @PathVariable Long itemId,
            @RequestParam Boolean favorito) {
        
        try {
            ItemColecao detalhes = new ItemColecao();
            detalhes.setFavorito(favorito);
            ItemColecao itemAtualizado = itemColecaoService.atualizarItem(itemId, detalhes);
            return ResponseEntity.ok(itemAtualizado);
            
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
