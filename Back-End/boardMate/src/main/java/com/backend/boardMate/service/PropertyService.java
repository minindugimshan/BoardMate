//package com.backend.boardMate.service;
//
//import com.backend.boardMate.entity.Property;
//import com.backend.boardMate.repository.PropertyRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class PropertyService {
//
//    @Autowired
//    private PropertyRepository propertyRepository;
//
//    public Property addProperty(Property property) {
//        return propertyRepository.save(property);
//    }
//
//    public List<Property> getAllProperties() {
//        return propertyRepository.findAll();
//    }
//
//    // Add more methods as needed
//}

package com.backend.boardMate.service;

import com.backend.boardMate.entity.Property;
import com.backend.boardMate.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    public Property addProperty(Property property) {
        return propertyRepository.save(property);
    }

    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    public Property getPropertyById(Long id) {
        return propertyRepository.findById(id).orElseThrow(() -> new RuntimeException("Property not found"));
    }

    public Property updateProperty(Long id, Property property) {
        Property existingProperty = getPropertyById(id);
        existingProperty.setTitle(property.getTitle());
        existingProperty.setLocation(property.getLocation());
        existingProperty.setPrice(property.getPrice());
        existingProperty.setImageUrl(property.getImageUrl());
        return propertyRepository.save(existingProperty);
    }

    public void deleteProperty(Long id) {
        propertyRepository.deleteById(id);
    }
}