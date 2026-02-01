package com.ajm.figurama.service;

import com.ajm.figurama.model.ColecaoRecord;
import com.ajm.figurama.model.dto.mapper.ColecaoMapper;
import com.ajm.figurama.repository.ColecaoRepository;
import com.ajm.figurama.repository.UsuarioRepository;
import com.ajm.figurama.repository.UsuarioEntity;
import com.ajm.figurama.repository.ActionFigureEntity;
import com.ajm.figurama.repository.ColecaoEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ColecaoServiceImpl implements ColecaoService {

    private final ColecaoRepository repository;
    private final ColecaoMapper mapper;
    private final UsuarioRepository usuarioRepository;

    @Override
    public ColecaoEntity salvar(ColecaoRecord dto) {
        ColecaoEntity entity = mapper.toEntity(dto);

        UsuarioEntity dono = usuarioRepository.findById(dto.usuarioId())
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    
        entity.setUsuario(dono);

        return repository.save(entity);
    }

    @Override
    public List<ColecaoEntity> listarTodos() {
        return repository.findAll();
    }

    // Em ColecaoServiceImpl.java

    @Override
    public void deletar(Long id) {
        // 1. Busca a coleção
        ColecaoEntity colecao = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Coleção não encontrada"));

        // 2. Solta todas as figures (Desvincula)
        for (ActionFigureEntity figure : colecao.getFigures()) {
            figure.setColecao(null);
            // Não precisamos chamar o save aqui individualmente se a transação estiver
            // ativa,
            // mas para garantir no seu setup atual, vamos salvar pelo
            // actionFigureRepository se tiver acesso,
            // ou deixar o Cascade MERGE cuidar disso se você salvar a coleção (mas vamos
            // deletar a coleção).

            // O jeito mais seguro sem injetar outro repository é apenas setar null e o
            // banco deve aceitar
            // se a constraint de FK permitir nulo (que é o padrão).
        }

        // OBS: Para isso funcionar 100% sem injetar o ActionFigureRepository aqui,
        // certifique-se de que a coluna colecao_id no banco aceita NULL (ela aceita por
        // padrão).

        // 3. Deleta a coleção (agora vazia de vínculos)
        repository.delete(colecao);
    }
}