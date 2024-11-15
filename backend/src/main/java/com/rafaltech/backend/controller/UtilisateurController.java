package com.rafaltech.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rafaltech.backend.model.Utilisateur;
import com.rafaltech.backend.service.UtilisateurService;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/utilisateurs")
@RequiredArgsConstructor
public class UtilisateurController {

    @Autowired
    private UtilisateurService utilisateurService;

    // Créer un Utilisateur
    @PostMapping("/post")
    public ResponseEntity<Utilisateur> createUtilisateur(@RequestBody Utilisateur utilisateur) {
        Utilisateur newUtilisateur = utilisateurService.saveUtilisateur(utilisateur);
        return ResponseEntity.status(201).body(newUtilisateur);
    }

    // Récupérer tous les Utilisateurs
    @GetMapping("/get")
    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurService.getAllUtilisateurs();
    }

    // Récupérer un Utilisateur par ID
    @GetMapping("/{id}")
    public ResponseEntity<Utilisateur> getUtilisateurById(@PathVariable Long id) {
        Optional<Utilisateur> utilisateur = utilisateurService.getUtilisateurById(id);
        return utilisateur.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Supprimer un Utilisateur
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUtilisateur(@PathVariable Long id) {
        utilisateurService.deleteUtilisateur(id);
        return ResponseEntity.noContent().build();
    }

    // Valider un Utilisateur
    @GetMapping("/validate")
    public ResponseEntity<Utilisateur> validateUtilisateur(@RequestParam String nom, @RequestParam String motDePasse) {
        Optional<Utilisateur> utilisateur = utilisateurService.validateUtilisateur(nom, motDePasse);
        return utilisateur.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(401).build());
    }
}
