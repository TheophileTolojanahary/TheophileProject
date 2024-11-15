package com.rafaltech.backend.service;


import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rafaltech.backend.model.Bac;
import com.rafaltech.backend.repository.BacRepository;

import java.util.List;
import java.util.Optional;

@Service

@RequiredArgsConstructor // Lombok génère un constructeur avec les dépendances
public class BacService {
    @Autowired
    private BacRepository bacRepository;

    public Bac saveBac(Bac bac) {
        return bacRepository.save(bac);
    }

    public List<Bac> getAllBacs() {
        return bacRepository.findAll();
    }

    public Optional<Bac> getBacById(Long id) {
        return bacRepository.findById(id);
    }

    public void deleteBac(Long id) {
        bacRepository.deleteById(id);
    }
    // BacService.java

public long countBacs() {
    return bacRepository.count();
}

   // Compter les bacs de type mobile
   public long countBacsByType(String type) {
    return bacRepository.countByTypeBac(type);
}

}
