package com.rafaltech.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rafaltech.backend.model.Admin;
import com.rafaltech.backend.service.AdminService;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/admins")
@RequiredArgsConstructor
public class AdminController {

    @Autowired
    private AdminService adminService;

    // Créer un Admin
    @PostMapping("/post")
    public ResponseEntity<Admin> createAdmin(@RequestBody Admin admin) {
        Admin newAdmin = adminService.saveAdmin(admin);
        return ResponseEntity.status(201).body(newAdmin);
    }

    // Récupérer tous les Admins
    @GetMapping("/get")
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    // Récupérer un Admin par ID
    @GetMapping("/{id}")
    public ResponseEntity<Admin> getAdminById(@PathVariable Long id) {
        Optional<Admin> admin = adminService.getAdminById(id);
        return admin.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Supprimer un Admin
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable Long id) {
        adminService.deleteAdmin(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/validate")
public ResponseEntity<Admin> validateAdmin(@RequestParam String nom, @RequestParam String motDePasse) {
    Optional<Admin> admin = adminService.validateAdmin(nom, motDePasse);
    return admin.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(401).build());
}

}
