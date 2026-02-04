package com.ajm.figurama.service;

import com.ajm.figurama.model.ColecaoRecord;
import com.ajm.figurama.repository.ColecaoEntity;
import java.util.List;

public interface ColecaoService {
    ColecaoEntity salvar(ColecaoRecord dto);
    List<ColecaoEntity> listarTodos();
    ColecaoEntity adicionarFigurasAColecao(Long colecaoId, List<Long> figureIds);
    void deletar(Long id);
}