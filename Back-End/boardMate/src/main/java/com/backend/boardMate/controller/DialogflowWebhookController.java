package com.backend.boardMate.controller;

import org.springframework.web.bind.annotation.RestController;

import com.backend.boardMate.model.Property;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api/dialog-flow")
public class DialogflowWebhookController {

    @SuppressWarnings("unchecked")
    @PostMapping("/webhook")
    public ResponseEntity<?> handleWebhook(@RequestBody Map<String, Object> request) {
        // Extract intent and parameters from the request
        Map<String, Object> queryResult = (Map<String, Object>) request.get("queryResult");
        Map<String, Object> parameters = (Map<String, Object>) queryResult.get("parameters");

        String location = (String) parameters.get("location");
        String priceRange = (String) parameters.get("priceRange");
        List<String> amenities = (List<String>) parameters.get("amenity");
        String propertyType = (String) parameters.get("propertyType");

        List<Property> searchResults = new ArrayList<>();

        Map<String, Object> response = formatDialogflowResponse(searchResults);

        return ResponseEntity.ok(response);
    }

    private Map<String, Object> formatDialogflowResponse(List<Property> places) {
        Map<String, Object> response = new HashMap<>();
        List<Map<String, Object>> fulfillmentMessages = new ArrayList<>();
        StringBuilder responseText = new StringBuilder();

        if (places.isEmpty()) {
            responseText.append("Sorry, I couldn't find any matching rooming places.");
        } else {
            responseText.append("Here are a few suggestions:\n");
            for (int i = 0; i < Math.min(3, places.size()); i++) {
                Property place = places.get(i);
                responseText.append(String.format("%d. %s - %s (Price: %s)\n",
                        i + 1, place.getTitle(), place.getLocation(), place.getPrice()));
            }
            if (places.size() > 3) {
                responseText.append("...and more. Ask me to see more options.");
            }
        }

        Map<String, Object> textResponse = new HashMap<>();
        textResponse.put("text", Collections.singletonList(responseText.toString()));

        Map<String, Object> message = new HashMap<>();
        message.put("text", textResponse);
        fulfillmentMessages.add(message);

        response.put("fulfillmentMessages", fulfillmentMessages);
        return response;
    }
}