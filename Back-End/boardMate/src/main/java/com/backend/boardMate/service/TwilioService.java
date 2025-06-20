package com.backend.boardMate.service;

import com.backend.boardMate.config.TwilioConfig;
import com.twilio.Twilio;
import com.twilio.rest.verify.v2.service.Verification;
import com.twilio.rest.verify.v2.service.VerificationCheck;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class TwilioService {
    private static final Logger logger = LoggerFactory.getLogger(TwilioService.class);

    private final TwilioConfig twilioConfig;

    public TwilioService(TwilioConfig twilioConfig) {
        this.twilioConfig = twilioConfig;
    }

    @PostConstruct
    public void init() {
        try {
            Twilio.init(twilioConfig.getAccountSid(), twilioConfig.getAuthToken());
            logger.info("Twilio initialized successfully");
        } catch (Exception e) {
            logger.error("Failed to initialize Twilio: {}", e.getMessage());
            throw new RuntimeException("Failed to initialize Twilio", e);
        }
    }

    public Map<String, Object> sendVerificationCode(String phoneNumber) {
        Map<String, Object> response = new HashMap<>();

        try {
            String formattedNumber = formatPhoneNumber(phoneNumber);
            logger.info("Attempting to send verification to: {}", formattedNumber);

            Verification verification = Verification.creator(
                    twilioConfig.getVerifyServiceSid(),
                    formattedNumber,
                    "sms"
            ).create();

            logger.info("Verification sent. SID: {}", verification.getSid());

            response.put("status", "success");
            response.put("message", "Verification code sent");
            response.put("verificationSid", verification.getSid());
        } catch (Exception e) {
            logger.error("Failed to send verification: {}", e.getMessage());
            response.put("status", "error");
            response.put("message", "Failed to send verification: " + e.getMessage());
        }

        return response;
    }

    public Map<String, Object> verifyCode(String phoneNumber, String code) {
        Map<String, Object> response = new HashMap<>();

        try {
            String formattedNumber = formatPhoneNumber(phoneNumber);
            logger.info("Attempting to verify code for: {}", formattedNumber);

            VerificationCheck verificationCheck = VerificationCheck.creator(
                            twilioConfig.getVerifyServiceSid())
                    .setTo(formattedNumber)
                    .setCode(code)
                    .create();

            logger.info("Verification status: {}", verificationCheck.getStatus());

            if ("approved".equals(verificationCheck.getStatus())) {
                response.put("status", "success");
                response.put("message", "Verification successful");
            } else {
                response.put("status", "error");
                response.put("message", "Invalid verification code");
            }
        } catch (Exception e) {
            logger.error("Verification failed: {}", e.getMessage());
            response.put("status", "error");
            response.put("message", "Verification failed: " + e.getMessage());
        }

        return response;
    }

    private String formatPhoneNumber(String phoneNumber) {
        // Remove all non-digit characters
        String digits = phoneNumber.replaceAll("[^0-9]", "");

        // Handle Sri Lankan numbers (replace with your country's logic if needed)
        if (digits.startsWith("0")) {
            digits = "94" + digits.substring(1); // Convert 07 to +947
        }

        // Ensure starts with +
        return digits.startsWith("+") ? digits : "+" + digits;
    }
}