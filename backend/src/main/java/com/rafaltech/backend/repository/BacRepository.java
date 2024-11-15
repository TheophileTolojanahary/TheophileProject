package com.rafaltech.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rafaltech.backend.model.Bac;

@Repository
public interface BacRepository extends JpaRepository<Bac, Long> {

    // Compter les bacs de type mobile
    long countByTypeBac(String typeBac);

}
