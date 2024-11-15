package com.rafaltech.backend.controller;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rafaltech.backend.model.Collecte;
import com.rafaltech.backend.service.CollecteService;

import java.util.List;
import java.util.Optional;
@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/collectes")
@RequiredArgsConstructor
public class CollecteController {

    // Le champ collecteService est injecté automatiquement grâce à @RequiredArgsConstructor
    private final CollecteService collecteService;

    // Créer une collecte
    @PostMapping("/post")
    public Collecte createCollecte(@RequestBody Collecte collecte) {
        return collecteService.saveCollecte(collecte);
    }

    // Récupérer toutes les collectes
    @GetMapping("/get")
    public List<Collecte> getAllCollectes() {
        return collecteService.getAllCollectes();
    }

    // Récupérer une collecte par ID
    @GetMapping("/{id}")
    public ResponseEntity<Collecte> getCollecteById(@PathVariable Long id) {
        Optional<Collecte> collecte = collecteService.getCollecteById(id);
        return collecte.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Supprimer une collecte
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCollecte(@PathVariable Long id) {
        collecteService.deleteCollecte(id);
        return ResponseEntity.noContent().build();
    }


    // Compter le total des collectes
    @GetMapping("/countTotal")
    public ResponseEntity<Long> countTotalCollectes() {
        Long totalCount = collecteService.countTotalCollectes();
        return ResponseEntity.ok(totalCount);
    }



}
