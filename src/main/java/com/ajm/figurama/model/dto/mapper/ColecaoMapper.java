package com.ajm.figurama.model.dto.mapper;

import com.ajm.figurama.model.ColecaoRecord;
import com.ajm.figurama.repository.ColecaoEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ColecaoMapper {

    // Ignora 'usuario' porque você o define manualmente no Service usando o ID
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "figures", ignore = true)
    @Mapping(target = "usuario", ignore = true) // <--- Isso resolve o aviso
    ColecaoEntity toEntity(ColecaoRecord dto);
    
    // Na volta, pegamos o ID do objeto usuario
    @Mapping(target = "usuarioId", source = "usuario.id")
    ColecaoRecord toDto(ColecaoEntity entity);
}