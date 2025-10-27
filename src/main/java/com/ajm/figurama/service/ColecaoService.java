package com.ajm.figurama.service;

import com.ajm.figurama.model.Colecao;
import com.ajm.figurama.repository.ColecaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ColecaoService {

    @Autowired
    private ColecaoRepository colecaoRepository;

    public List<Colecao> listarTodas() {
        return colecaoRepository.findAll();
    }

    public Optional<Colecao> buscarPorId(Long id) {
        return colecaoRepository.findById(id);
    }

    public Colecao salvar(Colecao colecao) {
        // Validação: visibilidade deve ser PUBLICA ou PRIVADA
        if (!colecao.getVisibilidade().equals("PUBLICA") &&
                !colecao.getVisibilidade().equals("PRIVADA")) {
            throw new IllegalArgumentException(
                    "Visibilidade deve ser PUBLICA ou PRIVADA"
            );
        }
        return colecaoRepository.save(colecao);
    }

    public void deletar(Long id) {
        colecaoRepository.deleteById(id);
    }

    public List<Colecao> buscarPorColecionador(Long colecionadorId) {
        return colecaoRepository.findByColecionadorId(colecionadorId);
    }

    public List<Colecao> buscarPorVisibilidade(String visibilidade) {
        return colecaoRepository.findByVisibilidade(visibilidade);
    }
}