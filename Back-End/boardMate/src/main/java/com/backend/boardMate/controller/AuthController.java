package com.backend.boardMate.controller;

import com.backend.boardMate.model.User;
import com.backend.boardMate.service.UserService;
import com.backend.boardMate.service.VerificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    private VerificationService verificationService;

    @PostMapping("/register")
    public Map<String, String> registerUser(@RequestBody Map<String, String> request) {
        User user = userService.registerStudent(
                request.get("email"),
                request.get("password"),
                request.get("firstName"),
                request.get("lastName"),
                request.get("mobile"),
                request.get("dateOfBirthDay"),
                request.get("dateOfBirthMonth"),
                request.get("dateOfBirthYear"),
                request.get("university"),
                request.get("universityId")
        );
        // Send verification codes
        verificationService.sendVerificationCode(user.getEmail(), "email");
        verificationService.sendVerificationCode(user.getMobile(), "mobile");

        Map<String, String> response = new HashMap<>();
        response.put("message", "User registered successfully. Please verify your email and phone.");
        return response;
    }

    @PostMapping("/register/landlord")
    public Map<String, String> registerLandlord(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        userService.registerLandlord(
                email,
                request.get("password"),
                request.get("firstName"),
                request.get("lastName"),
                request.get("mobile"),
                request.get("dateOfBirthDay"),
                request.get("dateOfBirthMonth"),
                request.get("dateOfBirthYear"),
                true // verified flag
        );
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Landlord registered successfully");
        return response;
    }

    @PostMapping("/login")  
    public Map<String, Object> loginUser(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            boolean isAuthenticated = userService.authenticateUser(email, password);
            
            if (isAuthenticated) {
                User user = userService.getUserByEmail(email);
                if (user != null) {
                    response.put("status", "success");
                    response.put("message", "Login successful");
                    response.put("user", user);
                } else {
                    response.put("status", "error");
                    response.put("error", "User not found");
                }
            } else {
                response.put("status", "error");
                response.put("error", "Invalid credentials");
            }
        } catch (Exception e) {
            response.put("status", "error");
            response.put("error", "Login failed: " + e.getMessage());
        }
        
        return response;
    }

    @PutMapping("/update-profile")
    public Map<String, Object> updateProfile(@RequestBody Map<String, Object> request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Long userId = Long.valueOf(request.get("id").toString());
            User updatedUser = userService.updateUserProfile(
                userId,
                (String) request.get("firstName"),
                (String) request.get("lastName"),
                (String) request.get("mobile"),
                (String) request.get("dateOfBirthDay"),
                (String) request.get("dateOfBirthMonth"),
                (String) request.get("dateOfBirthYear"),
                (String) request.get("university"),
                (String) request.get("universityId")
            );
            
            response.put("status", "success");
            response.put("message", "Profile updated successfully");
            response.put("user", updatedUser);
        } catch (Exception e) {
            response.put("status", "error");
            response.put("error", "Failed to update profile: " + e.getMessage());
        }
        
        return response;
    }

    @GetMapping("/user/{userId}")
    public Map<String, Object> getUserById(@PathVariable Long userId) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            User user = userService.getUserById(userId);
            if (user != null) {
                response.put("status", "success");
                response.put("user", user);
            } else {
                response.put("status", "error");
                response.put("error", "User not found");
            }
        } catch (Exception e) {
            response.put("status", "error");
            response.put("error", "Failed to get user: " + e.getMessage());
        }
        
        return response;
    }
}