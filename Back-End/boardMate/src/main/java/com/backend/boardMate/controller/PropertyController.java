//package com.backend.boardMate.controller;
//
//import com.backend.boardMate.entity.Property;
//import com.backend.boardMate.service.PropertyService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
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
//    @PostMapping
//    public Property addProperty(@RequestBody Property property) {
//        return propertyService.addProperty(property);
//    }
//
//    @GetMapping
//    public List<Property> getAllProperties() {
//        return propertyService.getAllProperties();
//    }
//
//    @GetMapping("/{id}")
//    public Property getPropertyById(@PathVariable Long id) {
//        return propertyService.getPropertyById(id);
//    }
//    @PutMapping("/{id}")
//    public Property updateProperty(@PathVariable Long id, @RequestBody Property property) {
//        return propertyService.updateProperty(id, property);
//    }
//}


//package com.backend.boardMate.controller;
//
//import com.backend.boardMate.entity.Property;
//import com.backend.boardMate.service.GoogleSheetsService;
//import com.backend.boardMate.service.PropertyService;
////import com.backend.boardMate.service.StorageService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.util.ArrayList;
//import java.util.Arrays;
//import java.util.List;
//import java.util.stream.Collectors;
//
//@RestController
//@RequestMapping("/api/properties")
//public class PropertyController {
//
//    @Autowired
//    private PropertyService propertyService;
//
////    @Autowired
////    private StorageService storageService;
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
//            @RequestParam("bedrooms") Integer bedrooms,
//            @RequestParam("bathrooms") Integer bathrooms,
//            @RequestParam("rooms") Integer rooms,
//            @RequestParam("file") MultipartFile file
//    ) {
//        // Upload the file and get the image URL
////        String imageUrl = storageService.uploadFile(file);
//
//        // Create a new Property object
//        Property property = new Property();
//        property.setTitle(title);
//        property.setLocation(location);
//        property.setPrice(price);
//        property.setBedrooms(bedrooms);
//        property.setBathrooms(bathrooms);
//        property.setRooms(rooms);
////        property.setImageUrl(imageUrl);
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
//    @RestController
//    @RequestMapping("/api/properties")
//    public class PropertyController {
//
//        private final GoogleSheetsService googleSheetsService;
//
//        @Autowired
//        public PropertyController(GoogleSheetsService googleSheetsService) {
//            this.googleSheetsService = googleSheetsService;
//        }
//
//        @GetMapping
//        public List<Property> getAllProperties() throws IOException {
//            List<List<Object>> rows = googleSheetsService.readData();
//            return rows.stream()
//                    .map(row -> new Property(
//                            row.get(0).toString(), // id
//                            row.get(1).toString(), // title
//                            row.get(2).toString(), // location
//                            Double.parseDouble(row.get(3).toString()) // price
//                    )
//                            .collect(Collectors.toList());
//        }
//
//        @PostMapping
//        public void addProperty(@RequestBody Property property) throws IOException {
//            List<List<Object>> data = new ArrayList<>();
//            data.add(Arrays.asList(
//                    property.getId(),
//                    property.getTitle(),
//                    property.getLocation(),
//                    property.getPrice()
//            ));
//            googleSheetsService.writeData(data);
//        }
//    }
//}

//package com.backend.boardMate.controller;
//
//import com.backend.boardMate.entity.Property;
//import com.backend.boardMate.service.GoogleSheetsService;
//import com.backend.boardMate.service.PropertyService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.util.ArrayList;
//import java.util.Arrays;
//import java.util.List;
//import java.util.stream.Collectors;
//
//@RestController
//@RequestMapping("/api/properties")
//public class PropertyController {
//
//    private final PropertyService propertyService;
//    private final GoogleSheetsService googleSheetsService;
//
//    @Autowired
//    public PropertyController(PropertyService propertyService, GoogleSheetsService googleSheetsService) {
//        this.propertyService = propertyService;
//        this.googleSheetsService = googleSheetsService;
//    }
//
//    /**
//     * Add a new property with an image file.
//     *
//     * @param title      The title of the property.
//     * @param location   The location of the property.
//     * @param price      The price of the property.
//     * @param bedrooms   The number of bedrooms.
//     * @param bathrooms  The number of bathrooms.
//     * @param rooms      The number of rooms.
//     * @param file       The image file to upload.
//     * @return The saved property.
//     */
//    @PostMapping
//    public Property addProperty(
//            @RequestParam("title") String title,
//            @RequestParam("location") String location,
//            @RequestParam("price") Double price,
//            @RequestParam("bedrooms") Integer bedrooms,
//            @RequestParam("bathrooms") Integer bathrooms,
//            @RequestParam("rooms") Integer rooms,
//            @RequestParam("file") MultipartFile file
//    ) {
//        // Create a new Property object
//        Property property = new Property();
//        property.setTitle(title);
//        property.setLocation(location);
//        property.setPrice(price);
//        property.setBedrooms(bedrooms);
//        property.setBathrooms(bathrooms);
//        property.setRooms(rooms);
//
//        // Save the property to the database
//        Property savedProperty = propertyService.addProperty(property);
//
//        // Save the property to Google Sheets
//        try {
//            List<Object> rowData = Arrays.asList(
//                    savedProperty.getId(),
//                    savedProperty.getTitle(),
//                    savedProperty.getLocation(),
//                    savedProperty.getPrice(),
//                    savedProperty.getBedrooms(),
//                    savedProperty.getBathrooms(),
//                    savedProperty.getRooms()
//            );
//            googleSheetsService.writeData(Arrays.asList(rowData));
//        } catch (IOException e) {
//            // Handle the exception (e.g., log the error)
//            e.printStackTrace();
//        }
//
//        return savedProperty;
//    }
//
//    /**
//     * Get all properties from Google Sheets.
//     *
//     * @return A list of all properties.
//     */
//    @GetMapping
//    public List<Property> getAllProperties() throws IOException {
//        List<List<Object>> rows = googleSheetsService.readData();
//        return rows.stream()
//                .map(row -> {
//                    Property property = new Property();
//                    property.setId(Long.parseLong(row.get(0).toString()));
//                    property.setTitle(row.get(1).toString());
//                    property.setLocation(row.get(2).toString());
//                    property.setPrice(Double.parseDouble(row.get(3).toString()));
//                    property.setBedrooms(Integer.parseInt(row.get(4).toString()));
//                    property.setBathrooms(Integer.parseInt(row.get(5).toString()));
//                    property.setRooms(Integer.parseInt(row.get(6).toString()));
//                    return property;
//                })
//                .collect(Collectors.toList());
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

    @GetMapping("/{id}")
    public Property getPropertyById(@PathVariable Long id) {
        return propertyService.getPropertyById(id);
    }

    @PutMapping("/{id}")
    public Property updateProperty(@PathVariable Long id, @RequestBody Property property) {
        return propertyService.updateProperty(id, property);
    }

    @DeleteMapping("/{id}")
    public void deleteProperty(@PathVariable Long id) {
        propertyService.deleteProperty(id);
    }
}