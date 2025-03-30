package com.backend.boardMate.controller;

import com.backend.boardMate.model.PaymentBookingDetails;
import com.backend.boardMate.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    // Endpoint to handle payment and booking data
    @PostMapping
    public ResponseEntity<String> savePaymentDetails(@RequestBody PaymentBookingDetails paymentBookingDetails) {
        try {
            System.out.println("Received Payment Data: " + paymentBookingDetails);
            System.out.println("Booking Date: " + paymentBookingDetails.getBookingDate());
            System.out.println("Price: " + paymentBookingDetails.getPrice());// Debug log
            System.out.println("Property Address: " + paymentBookingDetails.getPropertyAddress());
            System.out.println("Property Contact: " + paymentBookingDetails.getPropertyContact());
            System.out.println("Property ID: " + paymentBookingDetails.getPropertyId());
            System.out.println("Property Name: " + paymentBookingDetails.getPropertyName());
            System.out.println("User Id: " + paymentBookingDetails.getUserId());

            if (paymentBookingDetails.getBookingDate() == null) {
                return ResponseEntity.badRequest().body("Booking date cannot be null!");
            }

            // Save the payment and booking details in the database
            paymentService.savePaymentBooking(paymentBookingDetails);
            return ResponseEntity.status(HttpStatus.OK).body("Payment and booking details saved successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save payment and booking details");
        }
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<PaymentBookingDetails> getPaymentDetailsById(@PathVariable Long id) {
//        try {
//            // Retrieve the payment details from the service layer
//            PaymentBookingDetails paymentBookingDetails = paymentService.getPaymentBookingById(id);
//
//            if (paymentBookingDetails == null) {
//                return ResponseEntity.notFound().build();  // If payment not found
//            }
//
//            return ResponseEntity.ok(paymentBookingDetails);  // Return the found payment details
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();  // Handle any other errors
//        }
//    }
}