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
    public Map<String, String> loginUser(@RequestBody Map<String, String> request) {
        boolean isAuthenticated = userService.authenticateUser(request.get("email"), request.get("password"));
        Map<String, String> response = new HashMap<>();
        response.put("message", isAuthenticated ? "Login successful" : "Invalid credentials");
        return response;
    }
}