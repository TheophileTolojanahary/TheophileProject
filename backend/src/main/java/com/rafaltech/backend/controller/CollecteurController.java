package com.rafaltech.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rafaltech.backend.model.Collecteur;
import com.rafaltech.backend.service.CollecteurService;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/collecteurs")
@RequiredArgsConstructor
public class CollecteurController {

    @Autowired
    private CollecteurService collecteurService;

    // Créer un Collecteur
    @PostMapping("/post")
    public ResponseEntity<Collecteur> createCollecteur(@RequestBody Collecteur collecteur) {
        Collecteur newCollecteur = collecteurService.saveCollecteur(collecteur);
        return ResponseEntity.status(201).body(newCollecteur);
    }

    // Récupérer tous les Collecteurs
    @GetMapping("/get")
    public List<Collecteur> getAllCollecteurs() {
        return collecteurService.getAllCollecteurs();
    }

    // Récupérer un Collecteur par ID
    @GetMapping("/{id}")
    public ResponseEntity<Collecteur> getCollecteurById(@PathVariable Long id) {
        Optional<Collecteur> collecteur = collecteurService.getCollecteurById(id);
        return collecteur.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Supprimer un Collecteur
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCollecteur(@PathVariable Long id) {
        collecteurService.deleteCollecteur(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/validate")
    public ResponseEntity<Collecteur> validateCollecteur(@RequestParam String nom, @RequestParam String motDePasse) {
        Optional<Collecteur> collecteur = collecteurService.validateCollecteur(nom, motDePasse);
        return collecteur.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(401).build());
    }


    @GetMapping("/count")
public ResponseEntity<Long> countCollecteurs() {
    long count = collecteurService.countCollecteurs();
    return ResponseEntity.ok(count);
}

}
