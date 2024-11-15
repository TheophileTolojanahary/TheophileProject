package com.rafaltech.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rafaltech.backend.model.Collecteur;

@Repository
public interface CollecteurRepository extends JpaRepository<Collecteur, Long> {
}