package com.ajm.figurama.model.dto.mapper;

import com.ajm.figurama.model.ColecaoRecord;
import com.ajm.figurama.repository.ColecaoEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ColecaoMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "figures", ignore = true)
    ColecaoEntity toEntity(ColecaoRecord dto);
}
