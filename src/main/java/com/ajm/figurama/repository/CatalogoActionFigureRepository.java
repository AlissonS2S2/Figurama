package com.ajm.figurama.repository;

import com.ajm.figurama.model.CatalogoActionFigure;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CatalogoActionFigureRepository extends JpaRepository<CatalogoActionFigure, Long> {
    
    // Buscar apenas action figures ativas
    List<CatalogoActionFigure> findByAtivoTrue();
    
    // Buscar por categoria
    List<CatalogoActionFigure> findByCategoriaAndAtivoTrue(String categoria);
    
    // Buscar por nome (contém)
    List<CatalogoActionFigure> findByNomeContainingIgnoreCaseAndAtivoTrue(String nome);
    
    // Buscar por fabricante
    List<CatalogoActionFigure> findByFabricanteAndAtivoTrue(String fabricante);
}
