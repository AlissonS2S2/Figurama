package com.ajm.figurama.model;

public record ActionFigureRecord(
    String nome, 
    String franquia, 
    String fotoUrl, 
    String descricao,       
    String anoLancamento,   
    Boolean ativo,
    String categoria,          
    Long colecaoId
) {}