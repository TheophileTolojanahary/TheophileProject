package com.rafaltech.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.rafaltech.backend.model.Collecteur;
import com.rafaltech.backend.repository.CollecteurRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CollecteurService {

    private final CollecteurRepository collecteurRepository;

    public Collecteur saveCollecteur(Collecteur collecteur) {
        return collecteurRepository.save(collecteur);
    }

    public List<Collecteur> getAllCollecteurs() {
        return collecteurRepository.findAll();
    }

    public Optional<Collecteur> getCollecteurById(Long id) {
        return collecteurRepository.findById(id);
    }

    public void deleteCollecteur(Long id) {
        collecteurRepository.deleteById(id);
    }

    public Optional<Collecteur> validateCollecteur(String nom, String motDePasse) {
        return collecteurRepository.findAll().stream()
            .filter(collecteur -> collecteur.getNom().equals(nom) && collecteur.getMotDePasse().equals(motDePasse))
            .findFirst();
    }

    public long countCollecteurs() {
        return collecteurRepository.count();
    }
    
}
