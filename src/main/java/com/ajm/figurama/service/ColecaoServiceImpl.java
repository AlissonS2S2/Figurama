package com.ajm.figurama.service;

import com.ajm.figurama.model.ColecaoRecord;
import com.ajm.figurama.model.dto.mapper.ColecaoMapper;
import com.ajm.figurama.repository.ColecaoRepository;
import com.ajm.figurama.repository.ColecaoEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ColecaoServiceImpl implements ColecaoService {

    private final ColecaoRepository repository;
    private final ColecaoMapper mapper;

    @Override
    public ColecaoEntity salvar(ColecaoRecord dto) {
        ColecaoEntity entity = mapper.toEntity(dto);
        return repository.save(entity);
    }

    @Override
    public List<ColecaoEntity> listarTodos() {
        return repository.findAll();
    }
}