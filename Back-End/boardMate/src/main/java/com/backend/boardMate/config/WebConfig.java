//package com.backend.boardMate.config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//public class WebConfig implements WebMvcConfigurer {
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**") // Allow all endpoints
//                .allowedOrigins("http://localhost:5173") // Allow requests from Vite frontend
//                .allowedMethods("GET", "POST", "PUT", "DELETE") // Allowed HTTP methods
//                .allowedHeaders("*"); // Allowed headers
//    }
//}
