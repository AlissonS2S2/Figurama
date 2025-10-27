package com.ajm.figurama.repository;

import com.ajm.figurama.model.ActionFigure;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ActionFigureRepository
        extends JpaRepository<ActionFigure, Long> {

    List<ActionFigure> findByCategoria(
            String categoria
    );

    List<ActionFigure> findByNomeContaining(
            String nome
    );
}