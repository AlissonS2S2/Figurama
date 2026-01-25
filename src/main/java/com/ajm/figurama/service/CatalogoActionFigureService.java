package com.ajm.figurama.service;

import com.ajm.figurama.model.CatalogoActionFigure;
import com.ajm.figurama.repository.CatalogoActionFigureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CatalogoActionFigureService {
    
    @Autowired
    private CatalogoActionFigureRepository catalogoRepository;
    
    @Autowired
    private FileStorageService fileStorageService;
    
    // Listar todas as action figures ativas do catálogo
    public List<CatalogoActionFigure> listarTodas() {
        return catalogoRepository.findByAtivoTrue();
    }
    
    // Buscar por ID
    public Optional<CatalogoActionFigure> buscarPorId(Long id) {
        return catalogoRepository.findById(id);
    }
    
    // Cadastrar nova action figure no catálogo (apenas ADMIN)
    public CatalogoActionFigure salvar(CatalogoActionFigure actionFigure) {
        if (actionFigure.getNome() == null || actionFigure.getNome().trim().isEmpty()) {
            throw new IllegalArgumentException("Nome é obrigatório");
        }
        if (actionFigure.getCategoria() == null || actionFigure.getCategoria().trim().isEmpty()) {
            throw new IllegalArgumentException("Categoria é obrigatória");
        }
        if (actionFigure.getUrlFoto() == null || actionFigure.getUrlFoto().trim().isEmpty()) {
            throw new IllegalArgumentException("Imagem é obrigatória");
        }
        return catalogoRepository.save(actionFigure);
    }
    
    // Desativar (soft delete)
    public void desativar(Long id) {
        catalogoRepository.findById(id).ifPresent(af -> {
            af.setAtivo(false);
            catalogoRepository.save(af);
        });
    }
    
    // Deletar permanentemente (apenas ADMIN)
    public void deletar(Long id) {
        catalogoRepository.findById(id).ifPresent(af -> {
            // Deletar imagem
            if (af.getUrlFoto() != null) {
                fileStorageService.deletarArquivo(af.getUrlFoto());
            }
            catalogoRepository.deleteById(id);
        });
    }
    
    // Buscar por categoria
    public List<CatalogoActionFigure> buscarPorCategoria(String categoria) {
        return catalogoRepository.findByCategoriaAndAtivoTrue(categoria);
    }
    
    // Buscar por nome
    public List<CatalogoActionFigure> buscarPorNome(String nome) {
        return catalogoRepository.findByNomeContainingIgnoreCaseAndAtivoTrue(nome);
    }
    
    // Buscar por fabricante
    public List<CatalogoActionFigure> buscarPorFabricante(String fabricante) {
        return catalogoRepository.findByFabricanteAndAtivoTrue(fabricante);
    }
}