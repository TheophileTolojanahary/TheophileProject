package com.rafaltech.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rafaltech.backend.model.Notification;
import com.rafaltech.backend.repository.NotificationRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor // Lombok génère un constructeur avec les dépendances
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    // Enregistrer une notification
    public Notification saveNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    // Récupérer toutes les notifications
    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    // Récupérer une notification par ID
    public Optional<Notification> getNotificationById(Long id) {
        return notificationRepository.findById(id);
    }

    // Supprimer une notification
    public void deleteNotification(Long id) {
        notificationRepository.deleteById(id);
    }

    // Compter le nombre total de notifications
    public long countNotifications() {
        return notificationRepository.count();
    }
}
