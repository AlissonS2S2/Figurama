package com.ajm.figurama.service;

import com.ajm.figurama.model.ColecaoRecord;
import com.ajm.figurama.model.dto.mapper.ColecaoMapper;
import com.ajm.figurama.repository.ColecaoRepository;
import com.ajm.figurama.repository.UsuarioRepository;
import com.ajm.figurama.repository.UsuarioEntity;
import com.ajm.figurama.repository.ActionFigureEntity;
import com.ajm.figurama.repository.ColecaoEntity;
import com.ajm.figurama.repository.ActionFigureRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ColecaoServiceImpl implements ColecaoService {

    private final ColecaoRepository repository;
    private final ColecaoMapper mapper;
    private final UsuarioRepository usuarioRepository;
    private final ActionFigureRepository actionFigureRepository;

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

    @Override
    public ColecaoEntity atualizar(Long id, ColecaoRecord dto) {
        System.out.println("=== SERVICE ATUALIZAR COLEÇÃO ===");
        System.out.println("ID recebido: " + id);
        System.out.println("DTO recebido: " + dto);
        
        // 1. Buscar a coleção existente
        ColecaoEntity colecao = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Coleção não encontrada"));

        System.out.println("Coleção encontrada: " + colecao.getTitulo());
        System.out.println("Título atual: " + colecao.getTitulo());
        System.out.println("Descrição atual: " + colecao.getDescricao());

        // 2. Atualizar apenas os campos permitidos
        colecao.setTitulo(dto.titulo());
        colecao.setDescricao(dto.descricao());

        System.out.println("Novo título: " + colecao.getTitulo());
        System.out.println("Nova descrição: " + colecao.getDescricao());

        // 3. Manter o usuário original (não permite trocar de dono)
        // 4. Manter as figuras existentes

        // 5. Salvar as alterações
        ColecaoEntity salva = repository.save(colecao);
        System.out.println("Coleção salva: " + salva.getTitulo());
        
        return salva;
    }

    @Override
    public ColecaoEntity adicionarFigurasAColecao(Long colecaoId, List<Long> figureIds) {
        // 1. Buscar a coleção
        ColecaoEntity colecao = repository.findById(colecaoId)
            .orElseThrow(() -> new RuntimeException("Coleção não encontrada"));

        // 2. Buscar figuras originais e criar cópias para a coleção
        for (Long figureId : figureIds) {
            ActionFigureEntity figuraOriginal = actionFigureRepository.findById(figureId)
                .orElseThrow(() -> new RuntimeException("Figura " + figureId + " não encontrada"));
            
            // Criar uma cópia da figura para esta coleção
            ActionFigureEntity figuraCopia = ActionFigureEntity.builder()
                .nome(figuraOriginal.getNome())
                .descricao(figuraOriginal.getDescricao())
                .ativo(figuraOriginal.getAtivo())
                .categoria(figuraOriginal.getCategoria())
                .anoLancamento(figuraOriginal.getAnoLancamento())
                .franquia(figuraOriginal.getFranquia())
                .urlFoto(figuraOriginal.getUrlFoto())
                .colecao(colecao)  // Vincular a cópia à coleção
                .build();
            
            // Salvar a cópia
            actionFigureRepository.save(figuraCopia);
        }

        // 3. Salvar a coleção para atualizar as relações
        return repository.save(colecao);
    }

    @Override
    public void deletar(Long id) {
        // 1. Busca a coleção
        ColecaoEntity colecao = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Coleção não encontrada"));

        // 2. Remove todas as cópias de figuras da coleção
        for (ActionFigureEntity figure : colecao.getFigures()) {
            actionFigureRepository.delete(figure);  // Deletar a cópia
        }

        // 3. Deleta a coleção
        repository.delete(colecao);
    }
}