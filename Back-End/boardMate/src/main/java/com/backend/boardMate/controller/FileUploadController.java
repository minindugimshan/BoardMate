//package com.backend.boardMate.controller;
//
//import com.backend.boardMate.service.StorageService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.multipart.MultipartFile;
//
//@RestController
//public class FileUploadController {
//
//    @Autowired
//    private StorageService storageService;
//
//    @PostMapping("/upload")
//    public String uploadImage(@RequestParam("file") MultipartFile file) {
//        // Logic to upload the file to a storage service
//        String imageUrl = storageService.uploadFile(file);
//        return imageUrl;
//    }
//}
