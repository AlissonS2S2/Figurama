package com.ajm.figurama.model.dto.mapper;

import com.ajm.figurama.model.ActionFigureRecord;
import com.ajm.figurama.repository.ActionFigureEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface ActionFigureMapper {
    
    // Mapeamento de ENTRADA (DTO -> Banco)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "colecao", ignore = true) // A coleção é setada manualmente no Service
    ActionFigureEntity toEntity(ActionFigureRecord dto);
    
    // Mapeamento de SAÍDA (Banco -> DTO)
    @Mapping(target = "colecaoId", source = "colecao.id", qualifiedByName = "mapColecaoId")
    @Mapping(target = "urlFoto", source = "urlFoto")
    // Os campos descricao, anoLancamento e ativo serão mapeados automaticamente por nome
    ActionFigureRecord toDto(ActionFigureEntity entity);
    
    @Named("mapColecaoId")
    default Long mapColecaoId(Long colecaoId) {
        return colecaoId;
    }
}