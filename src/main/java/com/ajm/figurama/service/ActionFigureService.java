package com.ajm.figurama.service;

import com.ajm.figurama.model.ActionFigureRecord;
import com.ajm.figurama.repository.ActionFigureEntity;
import java.util.List;

public interface ActionFigureService {
    
    ActionFigureEntity salvar(ActionFigureRecord dto);
    
    ActionFigureEntity atualizar(Long id, ActionFigureRecord dto);
    
    void deletar(Long id);
    
    ActionFigureEntity buscarPorId(Long id);
    
    List<ActionFigureEntity> listarTodos();
    
    List<ActionFigureEntity> buscarPorColecao(Long colecaoId);
    
    List<ActionFigureEntity> buscarPorFranquia(String franquia);
}
