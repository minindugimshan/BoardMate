package com.backend.boardMate.model;

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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTourUrl() {
        return tourUrl;
    }

    public void setTourUrl(String tourUrl) {
        this.tourUrl = tourUrl;
    }

    public Property getProperty() {
        return property;
    }

    public void setProperty(Property property) {
        this.property = property;
    }
}