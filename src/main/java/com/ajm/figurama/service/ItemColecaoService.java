package com.ajm.figurama.service;

import com.ajm.figurama.model.ItemColecao;
import com.ajm.figurama.model.Colecao;
import com.ajm.figurama.model.CatalogoActionFigure;
import com.ajm.figurama.repository.ItemColecaoRepository;
import com.ajm.figurama.repository.ColecaoRepository;
import com.ajm.figurama.repository.CatalogoActionFigureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemColecaoService {
    
    @Autowired
    private ItemColecaoRepository itemColecaoRepository;
    
    @Autowired
    private ColecaoRepository colecaoRepository;
    
    @Autowired
    private CatalogoActionFigureRepository catalogoRepository;
    
    // Adicionar action figure do catálogo à coleção do usuário
    public ItemColecao adicionarItemNaColecao(Long colecaoId, Long actionFigureId, ItemColecao itemDetalhes) {
        // Verificar se a coleção existe
        Colecao colecao = colecaoRepository.findById(colecaoId)
                .orElseThrow(() -> new RuntimeException("Coleção não encontrada"));
        
        // Verificar se a action figure existe no catálogo
        CatalogoActionFigure actionFigure = catalogoRepository.findById(actionFigureId)
                .orElseThrow(() -> new RuntimeException("Action Figure não encontrada no catálogo"));
        
        // Verificar se já não está na coleção
        Optional<ItemColecao> itemExistente = itemColecaoRepository
                .findByColecaoIdAndActionFigureId(colecaoId, actionFigureId);
        
        if (itemExistente.isPresent()) {
            throw new RuntimeException("Esta Action Figure já está na sua coleção!");
        }
        
        // Criar o item
        ItemColecao item = new ItemColecao();
        item.setColecao(colecao);
        item.setActionFigure(actionFigure);
        item.setObservacoes(itemDetalhes != null ? itemDetalhes.getObservacoes() : null);
        item.setPrecoCompra(itemDetalhes != null ? itemDetalhes.getPrecoCompra() : null);
        item.setEstado(itemDetalhes != null ? itemDetalhes.getEstado() : "Novo");
        item.setFavorito(itemDetalhes != null ? itemDetalhes.getFavorito() : false);
        
        return itemColecaoRepository.save(item);
    }
    
    // Listar itens de uma coleção
    public List<ItemColecao> listarItensDaColecao(Long colecaoId) {
        return itemColecaoRepository.findByColecaoId(colecaoId);
    }
    
    // Buscar item por ID
    public Optional<ItemColecao> buscarPorId(Long id) {
        return itemColecaoRepository.findById(id);
    }
    
    // Atualizar informações personalizadas do item
    public ItemColecao atualizarItem(Long itemId, ItemColecao dadosAtualizados) {
        return itemColecaoRepository.findById(itemId)
                .map(item -> {
                    if (dadosAtualizados.getObservacoes() != null) {
                        item.setObservacoes(dadosAtualizados.getObservacoes());
                    }
                    if (dadosAtualizados.getPrecoCompra() != null) {
                        item.setPrecoCompra(dadosAtualizados.getPrecoCompra());
                    }
                    if (dadosAtualizados.getEstado() != null) {
                        item.setEstado(dadosAtualizados.getEstado());
                    }
                    if (dadosAtualizados.getFavorito() != null) {
                        item.setFavorito(dadosAtualizados.getFavorito());
                    }
                    return itemColecaoRepository.save(item);
                })
                .orElseThrow(() -> new RuntimeException("Item não encontrado"));
    }
    
    // Remover item da coleção
    public void removerItem(Long itemId) {
        itemColecaoRepository.deleteById(itemId);
    }
    
    // Listar favoritos de uma coleção
    public List<ItemColecao> listarFavoritos(Long colecaoId) {
        return itemColecaoRepository.findByColecaoIdAndFavoritoTrue(colecaoId);
    }
    
    // Contar itens de uma coleção
    public Long contarItens(Long colecaoId) {
        return itemColecaoRepository.countByColecaoId(colecaoId);
    }
}