package com.rafaltech.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
// @Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "bactable") // Nom de la table

public class Bac {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private Long id;
    private String numBac;
    // private String longitude;
    // private String latitude;
    private double longitude;
    private double latitude;

    private String typeBac;
    private String status;
}