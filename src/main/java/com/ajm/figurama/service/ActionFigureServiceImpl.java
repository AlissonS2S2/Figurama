package com.ajm.figurama.service;

import com.ajm.figurama.model.ActionFigureRecord;
import com.ajm.figurama.model.dto.mapper.ActionFigureMapper;
import com.ajm.figurama.repository.ActionFigureEntity;
import com.ajm.figurama.repository.ActionFigureRepository;
import com.ajm.figurama.repository.ColecaoEntity;
import com.ajm.figurama.repository.ColecaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ActionFigureServiceImpl implements ActionFigureService {

    private final ActionFigureRepository repository;
    private final ActionFigureMapper mapper;
    private final ColecaoRepository colecaoRepository;

    @Override
    public ActionFigureEntity salvar(ActionFigureRecord dto) {
        ActionFigureEntity entity = mapper.toEntity(dto);
        
        // Verificar se a coleção existe
        if (dto.colecaoId() != null) {
            entity.setColecao(colecaoRepository.findById(dto.colecaoId())
                    .orElseThrow(() -> new RuntimeException("Coleção não encontrada com ID: " + dto.colecaoId())));
        }
        
        return repository.save(entity);
    }

    @Override
    public ActionFigureEntity atualizar(Long id, ActionFigureRecord dto) {
        ActionFigureEntity entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Action Figure não encontrada com ID: " + id));
        
        entity.setNome(dto.nome());
        entity.setFranquia(dto.franquia());
        entity.setUrlFoto(dto.urlFoto());
        entity.setDescricao(dto.descricao());
        entity.setCategoria(dto.categoria());
        entity.setAnoLancamento(dto.anoLancamento());
        if (dto.ativo() != null) { // Só atualiza se vier no JSON
            entity.setAtivo(dto.ativo());
        }
        
        if (dto.colecaoId() != null) {
            entity.setColecao(colecaoRepository.findById(dto.colecaoId())
                    .orElseThrow(() -> new RuntimeException("Coleção não encontrada com ID: " + dto.colecaoId())));
        }
        
        return repository.save(entity);
    }

    @Override
    public void deletar(Long id) {
    // 1. Busca a figure no banco
        ActionFigureEntity figure = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Figure não encontrada"));

    // 2. Remove o vínculo com a coleção (Define como NULL)
        figure.setColecao(null); 

    // 3. Salva a alteração (Update)
        repository.save(figure);
    
    // Agora a figure continua existindo no banco, mas o campo 'colecao_id' ficará vazio.
}

// Em ActionFigureServiceImpl.java

@Override
public void excluirDoCatalogo(Long id) {
    if (!repository.existsById(id)) {
        throw new RuntimeException("Figure não encontrada no catálogo");
    }
    
    // Opcional: Se o banco reclamar de chave estrangeira, descomente a linha abaixo
    // isso garante que ela é desvinculada antes de ser apagada.
    // this.deletar(id); 

    // Apaga a linha da tabela definitivamente
    repository.deleteById(id);
}

@Override
public ActionFigureEntity adicionarDaBusca(Long figureId, Long colecaoId) {
    // 1. Busca o "Molde" (Figure do Catálogo Global)
    ActionFigureEntity molde = repository.findById(figureId)
            .orElseThrow(() -> new RuntimeException("Figure original não encontrada"));

    // 2. Busca a Coleção de destino
    ColecaoEntity colecaoDestino = colecaoRepository.findById(colecaoId)
            .orElseThrow(() -> new RuntimeException("Coleção não encontrada"));

    // 3. Cria uma NOVA figure copiando os dados
    ActionFigureEntity novaCopia = ActionFigureEntity.builder()
            .nome(molde.getNome())
            .franquia(molde.getFranquia())
            .urlFoto(molde.getUrlFoto())
            .descricao(molde.getDescricao())
            .anoLancamento(molde.getAnoLancamento())
            .categoria(molde.getCategoria())
            .ativo(true)
            .colecao(colecaoDestino) // <--- Aqui vinculamos ao usuário
            .build();

    // 4. Salva a cópia no banco
    return repository.save(novaCopia);
}

    @Override
    public List<ActionFigureEntity> buscarPorNome(String nome) {
        return repository.findByNomeContainingIgnoreCase(nome);
}

    @Override
    public ActionFigureEntity buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Action Figure não encontrada com ID: " + id));
    }

    @Override
    public List<ActionFigureEntity> listarTodos() {
        return repository.findAll();
    }

    @Override
    public List<ActionFigureEntity> buscarPorColecao(Long colecaoId) {
        return repository.findByColecaoId(colecaoId);
    }

    @Override
    public List<ActionFigureEntity> buscarPorFranquia(String franquia) {
        return repository.findByFranquia(franquia);
    }

    @Override
    public List<ActionFigureEntity> buscarNovidades() {
    return repository.findTop6ByOrderByIdDesc();
    }
}
