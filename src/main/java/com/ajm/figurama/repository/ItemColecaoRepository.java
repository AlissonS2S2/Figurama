package com.ajm.figurama.repository;

import com.ajm.figurama.model.ItemColecao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ItemColecaoRepository extends JpaRepository<ItemColecao, Long> {
    
    // Buscar itens de uma coleção específica
    List<ItemColecao> findByColecaoId(Long colecaoId);
    
    // Buscar itens favoritos de uma coleção
    List<ItemColecao> findByColecaoIdAndFavoritoTrue(Long colecaoId);
    
    // Verificar se uma action figure já está na coleção
    @Query("SELECT i FROM ItemColecao i WHERE i.colecao.id = ?1 AND i.actionFigure.id = ?2")
    Optional<ItemColecao> findByColecaoIdAndActionFigureId(Long colecaoId, Long actionFigureId);
    
    // Contar itens de uma coleção
    Long countByColecaoId(Long colecaoId);
}