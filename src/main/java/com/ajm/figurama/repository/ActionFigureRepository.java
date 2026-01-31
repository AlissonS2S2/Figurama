package com.ajm.figurama.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActionFigureRepository extends JpaRepository<ActionFigureEntity, Long> {
    
    List<ActionFigureEntity> findByColecaoId(Long colecaoId);
    
    List<ActionFigureEntity> findByFranquia(String franquia);

    List<ActionFigureEntity> findTop6ByOrderIdDesc();
}
