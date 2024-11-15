package com.rafaltech.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rafaltech.backend.model.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
  
}
