package com.ajm.figurama.controller;

import com.ajm.figurama.model.Colecao;
import com.ajm.figurama.service.ColecaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/colecoes")
@CrossOrigin(origins = "*")
public class ColecaoController {

    @Autowired
    private ColecaoService colecaoService;

    // GET - Listar todas as coleções
    @GetMapping
    public ResponseEntity<List<Colecao>> listarTodas() {
        List<Colecao> colecoes = colecaoService.listarTodas();
        return ResponseEntity.ok(colecoes);
    }

    // GET - Buscar coleção por ID
    @GetMapping("/{id}")
    public ResponseEntity<Colecao> buscarPorId(@PathVariable Long id) {
        return colecaoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST - Cadastrar nova coleção
    @PostMapping
    public ResponseEntity<Colecao> cadastrar(@RequestBody Colecao colecao) {
        Colecao novaColecao = colecaoService.salvar(colecao);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(novaColecao);
    }

    // DELETE - Remover coleção
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        if (colecaoService.buscarPorId(id).isPresent()) {
            colecaoService.deletar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // Endpoint adicional: Buscar coleções públicas
    @GetMapping("/publicas")
    public ResponseEntity<List<Colecao>> listarPublicas() {
        List<Colecao> colecoes =
                colecaoService.buscarPorVisibilidade("PUBLICA");
        return ResponseEntity.ok(colecoes);
    }
}