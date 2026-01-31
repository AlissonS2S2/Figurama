package com.ajm.figurama.service;

import com.ajm.figurama.model.ActionFigureRecord;
import com.ajm.figurama.model.dto.mapper.ActionFigureMapper;
import com.ajm.figurama.repository.ActionFigureEntity;
import com.ajm.figurama.repository.ActionFigureRepository;
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
        entity.setFotoUrl(dto.fotoUrl());
        
        if (dto.colecaoId() != null) {
            entity.setColecao(colecaoRepository.findById(dto.colecaoId())
                    .orElseThrow(() -> new RuntimeException("Coleção não encontrada com ID: " + dto.colecaoId())));
        }
        
        return repository.save(entity);
    }

    @Override
    public void deletar(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Action Figure não encontrada com ID: " + id);
        }
        repository.deleteById(id);
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
}
