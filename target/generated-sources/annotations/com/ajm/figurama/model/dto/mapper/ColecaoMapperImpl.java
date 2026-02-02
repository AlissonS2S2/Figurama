package com.ajm.figurama.model.dto.mapper;

import com.ajm.figurama.model.ColecaoRecord;
import com.ajm.figurama.repository.ColecaoEntity;
import com.ajm.figurama.repository.UsuarioEntity;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-02-02T18:35:06-0300",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.45.0.v20260128-0750, environment: Java 21.0.9 (Oracle Corporation)"
)
@Component
public class ColecaoMapperImpl implements ColecaoMapper {

    @Override
    public ColecaoEntity toEntity(ColecaoRecord dto) {
        if ( dto == null ) {
            return null;
        }

        ColecaoEntity colecaoEntity = new ColecaoEntity();

        colecaoEntity.setDescricao( dto.descricao() );
        colecaoEntity.setQuantidade( dto.quantidade() );
        colecaoEntity.setTitulo( dto.titulo() );

        return colecaoEntity;
    }

    @Override
    public ColecaoRecord toDto(ColecaoEntity entity) {
        if ( entity == null ) {
            return null;
        }

        Long usuarioId = null;
        String titulo = null;
        String descricao = null;
        Integer quantidade = null;

        usuarioId = entityUsuarioId( entity );
        titulo = entity.getTitulo();
        descricao = entity.getDescricao();
        quantidade = entity.getQuantidade();

        ColecaoRecord colecaoRecord = new ColecaoRecord( titulo, descricao, quantidade, usuarioId );

        return colecaoRecord;
    }

    private Long entityUsuarioId(ColecaoEntity colecaoEntity) {
        if ( colecaoEntity == null ) {
            return null;
        }
        UsuarioEntity usuario = colecaoEntity.getUsuario();
        if ( usuario == null ) {
            return null;
        }
        Long id = usuario.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
