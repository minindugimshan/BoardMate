package com.backend.boardMate.service;


import com.backend.boardMate.model.Property;
import com.backend.boardMate.model.VirtualTour;
// import com.backend.boardMate.entity.Property;
// import com.backend.boardMate.entity.VirtualTour;

import com.backend.boardMate.repository.PropertyRepository;
import com.backend.boardMate.repository.VirtualTourRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private VirtualTourRepository virtualTourRepository;

    // Add a new property
    public Property addProperty(Property property) {
        // Save the virtual tour if it exists
        if (property.getVirtualTour() != null) {
            VirtualTour virtualTour = property.getVirtualTour();
            virtualTour.setProperty(property); // Set the relationship
            virtualTourRepository.save(virtualTour); // Save the virtual tour
        }
        return propertyRepository.save(property); // Save the property
    }

    // Get all properties
    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    // Get a property by ID
    public Property getPropertyById(Long id) {
        return propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found with id: " + id));
    }

    // Update a property
    public Property updateProperty(Long id, Property property) {
        Property existingProperty = getPropertyById(id); // Fetch the existing property

        // Update basic fields
        existingProperty.setTitle(property.getTitle());
        existingProperty.setLocation(property.getLocation());
        existingProperty.setLatitude(property.getLatitude());
        existingProperty.setLongitude(property.getLongitude());
        existingProperty.setMapLink(property.getMapLink());
        existingProperty.setPrice(property.getPrice());
        existingProperty.setType(property.getType());
        existingProperty.setBedrooms(property.getBedrooms());
        existingProperty.setBathrooms(property.getBathrooms());
        existingProperty.setRooms(property.getRooms());
        existingProperty.setArea(property.getArea());
        existingProperty.setDescription(property.getDescription());
        existingProperty.setAmenities(property.getAmenities());
//        existingProperty.setImageUrls(property.getImageUrls());
        existingProperty.setAddress(property.getAddress());
        existingProperty.setContactNumber(property.getContactNumber());
        existingProperty.setRating(property.getRating());
        existingProperty.setUniversity(property.getUniversity());

        // Update virtual tour
        if (property.getVirtualTour() != null) {
            VirtualTour virtualTour = property.getVirtualTour();
            virtualTour.setProperty(existingProperty); // Set the relationship
            virtualTourRepository.save(virtualTour); // Save the virtual tour
            existingProperty.setVirtualTour(virtualTour); // Update the property's virtual tour
        } else {
            // If no virtual tour is provided, remove the existing one
            if (existingProperty.getVirtualTour() != null) {
                virtualTourRepository.delete(existingProperty.getVirtualTour());
                existingProperty.setVirtualTour(null);
            }
        }

        return propertyRepository.save(existingProperty); // Save the updated property
    }

    // Delete a property
    public void deleteProperty(Long id) {
        Property property = getPropertyById(id); // Fetch the property

        // Delete the virtual tour if it exists
        if (property.getVirtualTour() != null) {
            virtualTourRepository.delete(property.getVirtualTour());
        }

        propertyRepository.deleteById(id); // Delete the property
    }
}