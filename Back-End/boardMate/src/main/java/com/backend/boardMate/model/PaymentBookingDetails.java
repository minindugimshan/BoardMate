package com.backend.boardMate.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "payment_booking_details")
public class PaymentBookingDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private Long propertyId;

    @Column(nullable = false)
    private String propertyName;

    @Column(nullable = false)
    private String propertyAddress;

    @Column(nullable = false)
    private String propertyContact;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private LocalDate bookingDate;

    @Column(nullable = false)
    private String paymentMethod; // "card", "bank_transfer", etc.

    @Column(nullable = false)
    private String transactionId;

    @Column(nullable = false)
    private Boolean receiptSent = false; // Track if receipt was sent

    // Getters and setters
}