package com.ajm.figurama.model.dto.mapper;

import com.ajm.figurama.model.ActionFigureRecord;
import com.ajm.figurama.repository.ActionFigureEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface ActionFigureMapper {
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "colecao", ignore = true)
    ActionFigureEntity toEntity(ActionFigureRecord dto);
    
    @Mapping(target = "colecaoId", source = "colecao.id", qualifiedByName = "mapColecaoId")
    ActionFigureRecord toDto(ActionFigureEntity entity);
    
    @Named("mapColecaoId")
    default Long mapColecaoId(Long colecaoId) {
        return colecaoId;
    }
}
