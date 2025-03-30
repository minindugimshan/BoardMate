package com.backend.boardMate.service;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.boardMate.model.Property;
import com.backend.boardMate.model.VirtualTour;
// import com.backend.boardMate.entity.Property;
// import com.backend.boardMate.entity.VirtualTour;
import com.backend.boardMate.repository.PropertyRepository;
import com.backend.boardMate.repository.VirtualTourRepository;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private VirtualTourRepository virtualTourRepository;

    // Add a new property
    public Property addProperty(Property property) {
        // Save the virtual tour if it exists
        // if (property.getVirtualTour() != null) {
        //     VirtualTour virtualTour = property.getVirtualTour();
        //     virtualTour.setProperty(property); // Set the relationship
        //     virtualTourRepository.save(virtualTour); // Save the virtual tour
        // }
        return propertyRepository.save(property); // Save the property
    }

    // Get all properties
    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    // Get a property by ID
    public Property getPropertyById(Long id) {
        Property property = propertyRepository.findById(id).orElseThrow(() -> new RuntimeException("Property not found with id: " + id));
        property = this.updatePropertyViewCount(property);
        return property;
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
        // existingProperty.setAmenities(property.getAmenities());
        // existingProperty.setImageUrls(property.getImageUrls());
        existingProperty.setAddress(property.getAddress());
        existingProperty.setContactNumber(property.getContactNumber());
        existingProperty.setRating(property.getRating());
        existingProperty.setUniversity(property.getUniversity());

        // Update virtual tour
        // if (property.getVirtualTour() != null) {
        //     VirtualTour virtualTour = property.getVirtualTour();
        //     virtualTour.setProperty(existingProperty); // Set the relationship
        //     virtualTourRepository.save(virtualTour); // Save the virtual tour
        //     existingProperty.setVirtualTour(virtualTour); // Update the property's virtual tour
        // } else {
        //     // If no virtual tour is provided, remove the existing one
        //     if (existingProperty.getVirtualTour() != null) {
        //         virtualTourRepository.delete(existingProperty.getVirtualTour());
        //         existingProperty.setVirtualTour(null);
        //     }
        // }

        return propertyRepository.save(existingProperty); // Save the updated property
    }

    // Delete a property
    public void deleteProperty(Long id) {
        Property property = getPropertyById(id); // Fetch the property

        // Delete the virtual tour if it exists
        // if (property.getVirtualTour() != null) {
        //     virtualTourRepository.delete(property.getVirtualTour());
        // }

        propertyRepository.deleteById(id); // Delete the property
    }

    // Get properties by landlord ID
    public List<Property> getPropertiesByLandlordId(Integer landlordId) {
        return propertyRepository.findByLandlordId(landlordId);
    }

    // search using query for location, type, price range, rooms, bathrooms, bedrooms
    public List<Property> searchProperties(String location, String type, Double minPrice, Double maxPrice) {
        return propertyRepository.search(location, type, minPrice, maxPrice);
    }


    public Property updatePropertyViewCount(Property property) {
        property.setViews(property.getViews() + 1);
        return propertyRepository.save(property);
    }

    public Property updatePropertyInquiryCount(Long id) {
        Property existingProperty = propertyRepository.getReferenceById(id); // Fetch the existing property
        existingProperty.setInquiries(existingProperty.getInquiries() + 1);
        return propertyRepository.saveAndFlush(existingProperty);
    }

    public void bookATour(Long propertyID, Long studentID, String tourDateTime) {
        VirtualTour virtualTour = new VirtualTour();
        // tourDateTime is a iso string
        try {
            SimpleDateFormat  dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
            virtualTour.setDate(dateFormat.parse(tourDateTime));
        } catch (ParseException e) {
            throw new RuntimeException("Invalid date format for tourDateTime: " + tourDateTime, e);
        }
        virtualTour.setPropertyId(propertyID);
        virtualTour.setStudentId(studentID);
        virtualTourRepository.save(virtualTour);
    }

    // Add images to a property
    public Property addImagesToProperty(Long propertyId, List<String> imageReferences) {
        Property property = propertyRepository.getReferenceById(propertyId);
        List<String> existingImages =  property.getImagesList() != null && property.getImagesList().split(",").length > 0 ? List.of(property.getImagesList().split(",")) : null;
        if (existingImages == null) {
            existingImages = new ArrayList<>();
        }
        existingImages.addAll(imageReferences);
        property.setImagesList(String.join(",", existingImages));
        return propertyRepository.save(property);
    }
}