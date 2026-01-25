package com.ajm.figurama.controller;

import com.ajm.figurama.model.ActionFigure;
import com.ajm.figurama.service.ActionFigureService;
import com.ajm.figurama.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/action-figures")
@CrossOrigin(origins = "*")
public class ActionFigureController {
    
    @Autowired
    private ActionFigureService actionFigureService;
    
    @Autowired
    private FileStorageService fileStorageService;
    
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
    
    // POST - Cadastrar action figure SEM imagem (apenas dados)
    @PostMapping
    public ResponseEntity<ActionFigure> cadastrar(@RequestBody ActionFigure actionFigure) {
        ActionFigure novaFigure = actionFigureService.salvar(actionFigure);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaFigure);
    }
    
    // POST - Cadastrar action figure COM imagem (multipart/form-data)
    @PostMapping("/com-imagem")
    public ResponseEntity<ActionFigure> cadastrarComImagem(
            @RequestParam("nome") String nome,
            @RequestParam("categoria") String categoria,
            @RequestParam(value = "descricao", required = false) String descricao,
            @RequestParam(value = "preco", required = false) Double preco,
            @RequestParam(value = "fabricante", required = false) String fabricante,
            @RequestParam("imagem") MultipartFile imagem) {
        
        try {
            // Salvar imagem e obter caminho
            String caminhoImagem = fileStorageService.salvarArquivo(imagem);
            
            // Criar action figure
            ActionFigure actionFigure = new ActionFigure();
            actionFigure.setNome(nome);
            actionFigure.setCategoria(categoria);
            actionFigure.setDescricao(descricao);
            actionFigure.setPreco(preco);
            actionFigure.setFabricante(fabricante);
            actionFigure.setUrlFoto(caminhoImagem);
            
            // Salvar no banco
            ActionFigure novaFigure = actionFigureService.salvar(actionFigure);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(novaFigure);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // PUT - Atualizar imagem de uma action figure existente
    @PutMapping("/{id}/imagem")
    public ResponseEntity<ActionFigure> atualizarImagem(
            @PathVariable Long id,
            @RequestParam("imagem") MultipartFile imagem) {
        
        return actionFigureService.buscarPorId(id)
            .map(actionFigure -> {
                // Deletar imagem antiga se existir
                if (actionFigure.getUrlFoto() != null) {
                    fileStorageService.deletarArquivo(actionFigure.getUrlFoto());
                }
                
                // Salvar nova imagem
                String novoCaminho = fileStorageService.salvarArquivo(imagem);
                actionFigure.setUrlFoto(novoCaminho);
                
                // Atualizar no banco
                ActionFigure atualizada = actionFigureService.salvar(actionFigure);
                return ResponseEntity.ok(atualizada);
            })
            .orElse(ResponseEntity.notFound().build());
    }
    
    // DELETE - Remover action figure (e sua imagem)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        return actionFigureService.buscarPorId(id)
            .map(actionFigure -> {
                // Deletar imagem se existir
                if (actionFigure.getUrlFoto() != null) {
                    fileStorageService.deletarArquivo(actionFigure.getUrlFoto());
                }
                
                // Deletar do banco
                actionFigureService.deletar(id);
                return ResponseEntity.noContent().<Void>build();
            })
            .orElse(ResponseEntity.notFound().build());
    }
    
    // Endpoint adicional: Buscar por categoria
    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<ActionFigure>> buscarPorCategoria(@PathVariable String categoria) {
        List<ActionFigure> figures = actionFigureService.buscarPorCategoria(categoria);
        return ResponseEntity.ok(figures);
    }
}