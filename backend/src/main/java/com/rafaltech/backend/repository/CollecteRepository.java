package com.rafaltech.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.rafaltech.backend.model.Collecte;
@Repository
public interface CollecteRepository extends JpaRepository<Collecte, Long> {

    @Query("SELECT COUNT(c) FROM Collecte c")
    Long countTotalCollectes();

    
}
