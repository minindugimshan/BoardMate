//package com.backend.boardMate.service;
//
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//import java.util.UUID;
//
//@Service
//public class StorageService {
//
//    // Directory where uploaded files will be stored
//    private final Path rootLocation = Paths.get("uploads");
//
//    public String uploadFile(MultipartFile file) {
//        try {
//            // Ensure the upload directory exists
//            if (!Files.exists(rootLocation)) {
//                Files.createDirectories(rootLocation);
//            }
//
//            // Generate a unique filename
//            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
//
//            // Save the file to the upload directory
//            Path destinationFile = rootLocation.resolve(filename);
//            Files.copy(file.getInputStream(), destinationFile);
//
//            // Return the file URL (for simplicity, return the filename)
//            return filename;
//        } catch (IOException e) {
//            throw new RuntimeException("Failed to store file: " + e.getMessage());
//        }
//    }
//}
