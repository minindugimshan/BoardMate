package com.backend.boardMate.service;

import com.backend.boardMate.model.PaymentBookingDetails;
import com.backend.boardMate.repository.PaymentBookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    @Autowired
    private PaymentBookingRepository paymentBookingRepository;

    public void savePaymentBooking(PaymentBookingDetails paymentBookingDetails) {
        try {
            // Log the payment details being saved
            System.out.println("Saving payment details: " + paymentBookingDetails);

            paymentBookingRepository.save(paymentBookingDetails);
        } catch (Exception e) {
            // Log the exception for better debugging
            e.printStackTrace();
            throw new RuntimeException("Failed to save payment booking", e);
        }
    }
}
