package com.ajm.figurama.controller.rotas;

public interface RotaActionFigures {
    String ROOT = "/action-figures";
    String LISTAR = "/listar";
    String BUSCAR_POR_ID = "/{id}";
    String BUSCAR_POR_COLECAO = "/colecao/{colecaoId}";
    String BUSCAR_POR_FRANQUIA = "/franquia";
    String SALVAR = "/salvar";
    String ATUALIZAR = "/{id}";
    String DELETAR = "/{id}";
    String NOVIDADES = "/novidades";
}
