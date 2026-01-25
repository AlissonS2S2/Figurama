package com.ajm.figurama.controller;

import com.ajm.figurama.model.CatalogoActionFigure;
import com.ajm.figurama.service.CatalogoActionFigureService;
import com.ajm.figurama.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * Controller para gerenciar o CATÁLOGO de Action Figures disponíveis
 * Apenas ADMIN pode adicionar/remover do catálogo
 */
@RestController
@RequestMapping("/api/catalogo")
@CrossOrigin(origins = "*")
public class CatalogoActionFigureController {
    
    @Autowired
    private CatalogoActionFigureService catalogoService;
    
    @Autowired
    private FileStorageService fileStorageService;
    
    // ========== ENDPOINTS PÚBLICOS (qualquer usuário pode ver) ==========
    
    // GET - Listar todas as action figures disponíveis no catálogo
    @GetMapping
    public ResponseEntity<List<CatalogoActionFigure>> listarTodas() {
        List<CatalogoActionFigure> figures = catalogoService.listarTodas();
        return ResponseEntity.ok(figures);
    }
    
    // GET - Buscar action figure por ID
    @GetMapping("/{id}")
    public ResponseEntity<CatalogoActionFigure> buscarPorId(@PathVariable Long id) {
        return catalogoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // GET - Buscar por categoria
    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<CatalogoActionFigure>> buscarPorCategoria(@PathVariable String categoria) {
        List<CatalogoActionFigure> figures = catalogoService.buscarPorCategoria(categoria);
        return ResponseEntity.ok(figures);
    }
    
    // GET - Buscar por nome (pesquisa)
    @GetMapping("/pesquisar")
    public ResponseEntity<List<CatalogoActionFigure>> pesquisar(@RequestParam String nome) {
        List<CatalogoActionFigure> figures = catalogoService.buscarPorNome(nome);
        return ResponseEntity.ok(figures);
    }
    
    // GET - Buscar por fabricante
    @GetMapping("/fabricante/{fabricante}")
    public ResponseEntity<List<CatalogoActionFigure>> buscarPorFabricante(@PathVariable String fabricante) {
        List<CatalogoActionFigure> figures = catalogoService.buscarPorFabricante(fabricante);
        return ResponseEntity.ok(figures);
    }
    
    // ========== ENDPOINTS ADMIN (apenas administradores) ==========
    
    // POST - Adicionar nova action figure ao catálogo COM imagem
    @PostMapping("/admin")
    public ResponseEntity<CatalogoActionFigure> adicionarAoCatalogo(
            @RequestParam("nome") String nome,
            @RequestParam("categoria") String categoria,
            @RequestParam(value = "descricao", required = false) String descricao,
            @RequestParam(value = "precoSugerido", required = false) Double precoSugerido,
            @RequestParam(value = "fabricante", required = false) String fabricante,
            @RequestParam(value = "anoLancamento", required = false) String anoLancamento,
            @RequestParam(value = "escala", required = false) String escala,
            @RequestParam("imagem") MultipartFile imagem) {
        
        try {
            // Salvar imagem
            String caminhoImagem = fileStorageService.salvarArquivo(imagem);
            
            // Criar action figure no catálogo
            CatalogoActionFigure actionFigure = new CatalogoActionFigure();
            actionFigure.setNome(nome);
            actionFigure.setCategoria(categoria);
            actionFigure.setDescricao(descricao);
            actionFigure.setPrecoSugerido(precoSugerido);
            actionFigure.setFabricante(fabricante);
            actionFigure.setAnoLancamento(anoLancamento);
            actionFigure.setEscala(escala);
            actionFigure.setUrlFoto(caminhoImagem);
            actionFigure.setAtivo(true);
            
            CatalogoActionFigure novaFigure = catalogoService.salvar(actionFigure);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(novaFigure);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // DELETE - Desativar action figure do catálogo (soft delete)
    @DeleteMapping("/admin/{id}/desativar")
    public ResponseEntity<Void> desativar(@PathVariable Long id) {
        catalogoService.desativar(id);
        return ResponseEntity.noContent().build();
    }
    
    // DELETE - Remover permanentemente do catálogo
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        catalogoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}