package com.backend.boardMate.controller;

import com.backend.boardMate.service.VerificationService;
import com.backend.boardMate.service.UserService;
import com.backend.boardMate.service.TwilioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/verify")
public class VerificationController {

    @Autowired
    private VerificationService verificationService;

    @Autowired
    private UserService userService;

    @Autowired
    private TwilioService twilioService;

    /**
     * Upload and verify identity document (ID/Passport) using Veriff
     */
    @PostMapping(value = "/document", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Map<String, String> verifyDocument(
            @RequestParam("userId") String userId,
            @RequestParam("fullName") String fullName,
            @RequestParam("document") MultipartFile document) {

        return verificationService.verifyDocument(userId, fullName, document);
    }

    /**
     * Get document verification status and details
     */
    @GetMapping("/document/status")
    public Map<String, Object> getDocumentStatus(@RequestParam("userId") String userId) {
        Map<String, Object> response = new HashMap<>();

        boolean isVerified = verificationService.isDocumentVerified(userId);
        Map<String, Object> details = verificationService.getDocumentDetails(userId);

        response.put("userId", userId);
        response.put("verified", isVerified);
        response.put("details", details);

        return response;
    }

    /**
     * Send verification code to email or mobile
     */
    @PostMapping("/send-code")
    public Map<String, String> sendVerificationCode(@RequestBody Map<String, String> request) {
        Map<String, String> response = new HashMap<>();
        try {
            String recipient = request.containsKey("email") ? request.get("email") : request.get("mobile");
            String type = request.containsKey("email") ? "email" : "mobile";

            if (recipient == null || recipient.isEmpty()) {
                response.put("status", "error");
                response.put("message", "Email or mobile number is required");
                return response;
            }

            return verificationService.sendVerificationCode(recipient, type);
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", e.getMessage() != null ? e.getMessage() : "Unknown error occurred");
            return response;
        }
    }

    /**
     * Verify code entered by user
     */
    @PostMapping("/check-code")
    public Map<String, String> checkVerificationCode(@RequestBody Map<String, String> request) {
        String recipient = request.containsKey("email") ? request.get("email") : request.get("mobile");
        String code = request.get("code");

        // Validate input
        if (recipient == null || recipient.isEmpty() || code == null || code.isEmpty()) {
            Map<String, String> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", "Recipient and verification code are required");
            return response;
        }

        Map<String, String> response = verificationService.verifyCode(recipient, code);

        // If successful, mark user as verified
        if ("success".equals(response.get("status"))) {
            userService.markUserAsVerified(recipient);
        }
        return response;
    }

    @PostMapping("/send-sms-code")
    public ResponseEntity<Map<String, Object>> sendSmsCode(@RequestBody Map<String, String> request) {
        String phoneNumber = request.get("phoneNumber");
        if (phoneNumber == null || phoneNumber.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of(
                    "status", "error",
                    "message", "Phone number is required"
            ));
        }

        Map<String, Object> response = twilioService.sendVerificationCode(phoneNumber);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify-sms-code")
    public ResponseEntity<Map<String, Object>> verifySmsCode(
            @RequestBody Map<String, String> request) {
        String phoneNumber = request.get("phoneNumber");
        String code = request.get("code");

        if (phoneNumber == null || phoneNumber.isEmpty() || code == null || code.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of(
                    "status", "error",
                    "message", "Phone number and code are required"
            ));
        }

        Map<String, Object> response = twilioService.verifyCode(phoneNumber, code);
        return ResponseEntity.ok(response);
    }
}

// @RestControllerAdvice
// public class GlobalExceptionHandler {
//     @ExceptionHandler(Exception.class)
//     public ResponseEntity<Map<String, String>> handleAllExceptions(Exception ex) {
//         Map<String, String> error = new HashMap<>();
//         error.put("status", "error");
//         error.put("message", ex.getMessage() != null ? ex.getMessage() : "Unknown error occurred");
//         return ResponseEntity.badRequest().body(error);
//     }
// }