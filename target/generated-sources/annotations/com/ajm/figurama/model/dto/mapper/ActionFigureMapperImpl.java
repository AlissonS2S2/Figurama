package com.ajm.figurama.model.dto.mapper;

import com.ajm.figurama.model.ActionFigureRecord;
import com.ajm.figurama.repository.ActionFigureEntity;
import com.ajm.figurama.repository.ColecaoEntity;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-02-02T18:35:07-0300",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.45.0.v20260128-0750, environment: Java 21.0.9 (Oracle Corporation)"
)
@Component
public class ActionFigureMapperImpl implements ActionFigureMapper {

    @Override
    public ActionFigureEntity toEntity(ActionFigureRecord dto) {
        if ( dto == null ) {
            return null;
        }

        ActionFigureEntity.ActionFigureEntityBuilder actionFigureEntity = ActionFigureEntity.builder();

        actionFigureEntity.anoLancamento( dto.anoLancamento() );
        actionFigureEntity.ativo( dto.ativo() );
        actionFigureEntity.categoria( dto.categoria() );
        actionFigureEntity.descricao( dto.descricao() );
        actionFigureEntity.franquia( dto.franquia() );
        actionFigureEntity.nome( dto.nome() );
        actionFigureEntity.urlFoto( dto.urlFoto() );

        return actionFigureEntity.build();
    }

    @Override
    public ActionFigureRecord toDto(ActionFigureEntity entity) {
        if ( entity == null ) {
            return null;
        }

        Long colecaoId = null;
        String urlFoto = null;
        String nome = null;
        String descricao = null;
        String categoria = null;
        String franquia = null;
        String anoLancamento = null;
        Boolean ativo = null;

        colecaoId = mapColecaoId( entityColecaoId( entity ) );
        urlFoto = entity.getUrlFoto();
        nome = entity.getNome();
        descricao = entity.getDescricao();
        categoria = entity.getCategoria();
        franquia = entity.getFranquia();
        anoLancamento = entity.getAnoLancamento();
        ativo = entity.getAtivo();

        ActionFigureRecord actionFigureRecord = new ActionFigureRecord( nome, descricao, categoria, urlFoto, franquia, anoLancamento, ativo, colecaoId );

        return actionFigureRecord;
    }

    private Long entityColecaoId(ActionFigureEntity actionFigureEntity) {
        if ( actionFigureEntity == null ) {
            return null;
        }
        ColecaoEntity colecao = actionFigureEntity.getColecao();
        if ( colecao == null ) {
            return null;
        }
        Long id = colecao.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
