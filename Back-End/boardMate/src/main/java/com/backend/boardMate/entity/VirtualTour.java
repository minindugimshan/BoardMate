package com.backend.boardMate.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class VirtualTour {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tourUrl;

    @OneToOne(mappedBy = "virtualTour")
    private Property property;
}