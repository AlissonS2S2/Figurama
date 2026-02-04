package com.ajm.figurama.service;

import com.ajm.figurama.model.ActionFigureRecord;
import com.ajm.figurama.repository.ActionFigureEntity;
import java.util.List;

public interface ActionFigureService {
    
    ActionFigureEntity salvar(ActionFigureRecord dto);
    
    ActionFigureEntity atualizar(Long id, ActionFigureRecord dto);
    
    void deletar(Long id);

    void excluirDoCatalogo(Long id);
    
    ActionFigureEntity buscarPorId(Long id);

    List<ActionFigureEntity> buscarPorNome(String nome);
    
    List<ActionFigureEntity> listarTodos();
    
    List<ActionFigureEntity> buscarPorColecao(Long colecaoId);
    
    List<ActionFigureEntity> buscarPorFranquia(String franquia);

    List<ActionFigureEntity> buscarNovidades();

    // Adicione a assinatura
    ActionFigureEntity adicionarDaBusca(Long figureId, Long colecaoId);
    
    // NOVO: Remover figura específica de uma coleção
    void removerFiguraDaColecao(Long figureId, Long colecaoId);
}
