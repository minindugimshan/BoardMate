
package com.backend.boardMate.controller;

import com.backend.boardMate.model.Property;
import com.backend.boardMate.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

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

    @GetMapping("/{id}")
    public Property getPropertyById(@PathVariable Long id) {
        return propertyService.getPropertyById(id);
    }

    @PutMapping("/{id}")
    public Property updateProperty(@PathVariable Long id, @RequestBody Property property) {
        return propertyService.updateProperty(id, property);
    }

    @DeleteMapping("/{id}")  // DELETE request for specific property ID
    public String deleteProperty(@PathVariable Long id) {
        // Your service call to delete the property
        return "Property with ID " + id + " deleted successfully.";
    }

    @PostMapping(consumes = "multipart/form-data")
    public String uploadProperty(
            @RequestPart("file") MultipartFile file,  // Handles file upload
            @RequestPart("data") Map<String, String> data // Handles other form fields
    ) {
        return "File uploaded: " + file.getOriginalFilename();
    }
}