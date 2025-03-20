package com.backend.boardMate.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
@Table(name = "property")
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String location;
    private Double latitude;
    private Double longitude;
    private String mapLink;
    private Double price;
    private String type;
    private Integer bedrooms;
    private Integer bathrooms;
    private Integer rooms;
    private Double area;
    private String description;

    @ElementCollection
    @CollectionTable(name = "property_amenities", joinColumns = @JoinColumn(name = "property_id"))
    private List<String> amenities;

    @ElementCollection
    @CollectionTable(name = "property_images", joinColumns = @JoinColumn(name = "property_id"))
    private List<String> imageUrls;

    private String address;
    private String contactNumber;
    private Double rating;
    private String university;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "virtual_tour_id", referencedColumnName = "id")
    private VirtualTour virtualTour;
}