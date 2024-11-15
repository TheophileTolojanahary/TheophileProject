package com.rafaltech.backend.controller;


import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rafaltech.backend.model.Bac;
import com.rafaltech.backend.service.BacService;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/bacs")
@RequiredArgsConstructor // Lombok génère un constructeur avec les dépendances
public class BacController {
    @Autowired
    private BacService bacService;

    // Créer un bac

    @PostMapping("/post")
    public Bac createBac(@RequestBody Bac bac) {
        return bacService.saveBac(bac);
    }
   
    // Récupérer tous les bacs
    @GetMapping("/get")
    public List<Bac> getAllBacs() {
        return bacService.getAllBacs();
    }

    // Récupérer un bac par ID
    @GetMapping("/{id}")
    public ResponseEntity<Bac> getBacById(@PathVariable Long id) {
        Optional<Bac> bac = bacService.getBacById(id);
        return bac.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Supprimer un bac
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteBac(@PathVariable Long id) {
        bacService.deleteBac(id);
        return ResponseEntity.noContent().build();
    }
    // BacController.java

@GetMapping("/count")
public ResponseEntity<Long> countBacs() {
    long count = bacService.countBacs();
    return ResponseEntity.ok(count);
}

    // Récupérer le nombre de bacs par type
    @GetMapping("/count/type/{typeBac}")
    public ResponseEntity<Long> countBacsByType(@PathVariable String typeBac) {
        long count = bacService.countBacsByType(typeBac);
        return ResponseEntity.ok(count);
    }

}