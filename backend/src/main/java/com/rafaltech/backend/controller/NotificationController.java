package com.rafaltech.backend.controller;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rafaltech.backend.model.Notification;
import com.rafaltech.backend.service.NotificationService;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/notifications")
@RequiredArgsConstructor // Lombok génère un constructeur avec les dépendances
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    // Créer une notification
    @PostMapping("/post")
    public Notification createNotification(@RequestBody Notification notification) {
        return notificationService.saveNotification(notification);
    }

    // Récupérer toutes les notifications
    @GetMapping("/get")
    public List<Notification> getAllNotifications() {
        return notificationService.getAllNotifications();
    }

    // Récupérer une notification par ID
    @GetMapping("/{id}")
    public ResponseEntity<Notification> getNotificationById(@PathVariable Long id) {
        Optional<Notification> notification = notificationService.getNotificationById(id);
        return notification.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Supprimer une notification
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteNotification(@PathVariable Long id) {
        notificationService.deleteNotification(id);
        return ResponseEntity.noContent().build();
    }

    // Compter le nombre total de notifications
    @GetMapping("/count")
    public ResponseEntity<Long> countNotifications() {
        long count = notificationService.countNotifications();
        return ResponseEntity.ok(count);
    }
}
