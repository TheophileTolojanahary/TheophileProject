package com.rafaltech.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.rafaltech.backend.model.Utilisateur;
import com.rafaltech.backend.repository.UtilisateurRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UtilisateurService {

    private final UtilisateurRepository utilisateurRepository;

    public Utilisateur saveUtilisateur(Utilisateur utilisateur) {
        return utilisateurRepository.save(utilisateur);
    }

    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }

    public Optional<Utilisateur> getUtilisateurById(Long id) {
        return utilisateurRepository.findById(id);
    }

    public void deleteUtilisateur(Long id) {
        utilisateurRepository.deleteById(id);
    }

    public Optional<Utilisateur> validateUtilisateur(String nom, String motDePasse) {
        return utilisateurRepository.findAll().stream()
            .filter(utilisateur -> utilisateur.getNom().equals(nom) && utilisateur.getMotDePasse().equals(motDePasse))
            .findFirst();
    }
}
