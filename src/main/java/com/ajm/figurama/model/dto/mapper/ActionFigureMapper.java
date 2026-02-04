package com.ajm.figurama.model.dto.mapper;

import com.ajm.figurama.model.ActionFigureRecord;
import com.ajm.figurama.model.dto.ActionFigureDTO;
import com.ajm.figurama.repository.ActionFigureEntity;
import com.ajm.figurama.repository.ColecaoEntity;
import com.ajm.figurama.repository.UsuarioEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface ActionFigureMapper {
    
    // Mapeamento de ENTRADA (DTO -> Banco)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "colecao", ignore = true) // A coleção é setada manualmente no Service
    ActionFigureEntity toEntity(ActionFigureRecord dto);
    
    // Mapeamento de SAÍDA (Banco -> DTO) - para o antigo Record
    @Mapping(target = "colecaoId", source = "colecao.id", qualifiedByName = "mapColecaoId")
    @Mapping(target = "urlFoto", source = "urlFoto")
    ActionFigureRecord toDto(ActionFigureEntity entity);
    
    // Mapeamento de SAÍDA (Banco -> DTO) - para o novo DTO com coleção
    ActionFigureDTO toActionFigureDTO(ActionFigureEntity entity);
    
    default ActionFigureDTO.ColecaoDTO colecaoToColecaoDTO(ColecaoEntity colecao) {
        if (colecao == null) return null;
        
        return ActionFigureDTO.ColecaoDTO.builder()
                .id(colecao.getId())
                .titulo(colecao.getTitulo())
                .descricao(colecao.getDescricao())
                .dataCriacao(colecao.getDataCriacao())
                .usuario(usuarioToUsuarioDTO(colecao.getUsuario()))
                .build();
    }
    
    default ActionFigureDTO.UsuarioDTO usuarioToUsuarioDTO(UsuarioEntity usuario) {
        if (usuario == null) return null;
        
        return ActionFigureDTO.UsuarioDTO.builder()
                .id(usuario.getId())
                .nomeUsuario(usuario.getNomeUsuario())
                .email(usuario.getEmail())
                .build();
    }
    
    @Named("mapColecaoId")
    default Long mapColecaoId(Long colecaoId) {
        return colecaoId;
    }
}