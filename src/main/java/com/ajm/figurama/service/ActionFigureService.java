package com.ajm.figurama.service;

import com.ajm.figurama.model.ActionFigure;
import com.ajm.figurama.repository.ActionFigureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActionFigureService {

    @Autowired
    private ActionFigureRepository actionFigureRepository;

    public List<ActionFigure> listarTodas() {
        return actionFigureRepository.findAll();
    }

    public Optional<ActionFigure> buscarPorId(Long id) {
        return actionFigureRepository.findById(id);
    }

    public ActionFigure salvar(ActionFigure actionFigure) {
        // Validação: nome e categoria são obrigatórios
        if (actionFigure.getNome() == null ||
                actionFigure.getNome().trim().isEmpty()) {
            throw new IllegalArgumentException(
                    "Nome da Action Figure é obrigatório"
            );
        }
        if (actionFigure.getCategoria() == null ||
                actionFigure.getCategoria().trim().isEmpty()) {
            throw new IllegalArgumentException(
                    "Categoria é obrigatória"
            );
        }
        return actionFigureRepository.save(actionFigure);
    }

    public void deletar(Long id) {
        actionFigureRepository.deleteById(id);
    }

    public List<ActionFigure> buscarPorCategoria(String categoria) {
        return actionFigureRepository.findByCategoria(categoria);
    }

    public List<ActionFigure> buscarPorNome(String nome) {
        return actionFigureRepository.findByNomeContaining(nome);
    }
}
