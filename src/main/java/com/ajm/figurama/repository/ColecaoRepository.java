package com.ajm.figurama.repository;

import com.ajm.figurama.model.Colecao;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ColecaoRepository
        extends JpaRepository<Colecao, Long> {

    List<Colecao> findByColecionadorId(
            Long colecionadorId
    );

    List<Colecao> findByVisibilidade(
            String visibilidade
    );
}