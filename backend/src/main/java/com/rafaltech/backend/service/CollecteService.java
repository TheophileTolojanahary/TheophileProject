package com.rafaltech.backend.service;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rafaltech.backend.model.Collecte;
import com.rafaltech.backend.repository.CollecteRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CollecteService {

    @Autowired
    private final CollecteRepository collecteRepository;

    public Collecte saveCollecte(Collecte collecte) {
        return collecteRepository.save(collecte);
    }

    public List<Collecte> getAllCollectes() {
        return collecteRepository.findAll();
    }

    public Optional<Collecte> getCollecteById(Long id) {
        return collecteRepository.findById(id);
    }

    public void deleteCollecte(Long id) {
        collecteRepository.deleteById(id);
    }

  

    public Long countTotalCollectes() {
        return collecteRepository.countTotalCollectes();
    }

    
}
