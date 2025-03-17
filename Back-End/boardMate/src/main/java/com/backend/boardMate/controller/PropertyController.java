package com.backend.boardMate.controller;

import com.backend.boardMate.entity.Property;
import com.backend.boardMate.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    @PostMapping
    public Property addProperty(@RequestBody Property property) {
        return propertyService.addProperty(property);
    }

    @GetMapping
    public List<Property> getAllProperties() {
        return propertyService.getAllProperties();
    }

    // Add more endpoints as needed
}

//package com.backend.boardMate.controller;
//
//import com.backend.boardMate.entity.Property;
//import com.backend.boardMate.service.PropertyService;
//import com.backend.boardMate.service.StorageService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/properties")
//public class PropertyController {
//
//    @Autowired
//    private PropertyService propertyService;
//
//    @Autowired
//    private StorageService storageService;
//
//    /**
//     * Add a new property with an image file.
//     *
//     * @param title    The title of the property.
//     * @param location The location of the property.
//     * @param price    The price of the property.
//     * @param file     The image file to upload.
//     * @return The saved property.
//     */
//    @PostMapping
//    public Property addProperty(
//            @RequestParam("title") String title,
//            @RequestParam("location") String location,
//            @RequestParam("price") Double price,
//            @RequestParam("file") MultipartFile file
//    ) {
//        // Upload the file and get the image URL
//        String imageUrl = storageService.uploadFile(file);
//
//        // Create a new Property object
//        Property property = new Property();
//        property.setTitle(title);
//        property.setLocation(location);
//        property.setPrice(price);
//        property.setImageUrl(imageUrl);
//
//        // Save the property
//        return propertyService.addProperty(property);
//    }
//
//    /**
//     * Get all properties.
//     *
//     * @return A list of all properties.
//     */
//    @GetMapping
//    public List<Property> getAllProperties() {
//        return propertyService.getAllProperties();
//    }
//
//    /**
//     * Get a property by its ID.
//     *
//     * @param id The ID of the property.
//     * @return The property with the specified ID.
//     */
//    @GetMapping("/{id}")
//    public Property getPropertyById(@PathVariable Long id) {
//        return propertyService.getPropertyById(id);
//    }
//
//    /**
//     * Update a property.
//     *
//     * @param id       The ID of the property to update.
//     * @param property The updated property data.
//     * @return The updated property.
//     */
//    @PutMapping("/{id}")
//    public Property updateProperty(@PathVariable Long id, @RequestBody Property property) {
//        return propertyService.updateProperty(id, property);
//    }
//
//    /**
//     * Delete a property by its ID.
//     *
//     * @param id The ID of the property to delete.
//     * @return A message indicating the property was deleted.
//     */
//    @DeleteMapping("/{id}")
//    public String deleteProperty(@PathVariable Long id) {
//        propertyService.deleteProperty(id);
//        return "Property deleted successfully";
//    }
//}