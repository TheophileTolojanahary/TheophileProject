package com.rafaltech.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.rafaltech.backend.model.Admin;
import com.rafaltech.backend.repository.AdminRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final AdminRepository adminRepository;

    public Admin saveAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Optional<Admin> getAdminById(Long id) {
        return adminRepository.findById(id);
    }

    public void deleteAdmin(Long id) {
        adminRepository.deleteById(id);
    }

    public Optional<Admin> validateAdmin(String nom, String motDePasse) {
        return adminRepository.findAll().stream()
            .filter(admin -> admin.getNom().equals(nom) && admin.getMotDePasse().equals(motDePasse))
            .findFirst();
    }
    
}
