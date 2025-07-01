package com.backend.boardMate.service;

import com.backend.boardMate.model.PaymentBookingDetails;
import com.backend.boardMate.repository.PaymentBookingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.Optional;

@Service
public class PaymentService {
    private static final Logger logger = LoggerFactory.getLogger(PaymentService.class);

    private final PaymentBookingRepository paymentRepository;
    private final EmailService emailService;
    private final UserService userService;

    @Autowired
    public PaymentService(PaymentBookingRepository paymentRepository,
                         EmailService emailService,
                         UserService userService) {
        this.paymentRepository = paymentRepository;
        this.emailService = emailService;
        this.userService = userService;
    }

    @Transactional
    public PaymentBookingDetails processPayment(PaymentBookingDetails paymentDetails) {
        // Validate and process payment
        PaymentBookingDetails savedPayment = paymentRepository.save(paymentDetails);
        sendReceiptEmailAsync(savedPayment);
        return savedPayment;
    }

    @Async
    public CompletableFuture<Void> sendReceiptEmailAsync(PaymentBookingDetails payment) {
        try {
            String userEmail = userService.getUserEmailById(payment.getUserId());
            emailService.sendPaymentReceipt(payment, userEmail);
            payment.setReceiptSent(true);
            paymentRepository.save(payment);
            return CompletableFuture.completedFuture(null);
        } catch (Exception e) {
            logger.error("Failed to send receipt: {}", e.getMessage());
            return CompletableFuture.failedFuture(e);
        }
    }

    public List<PaymentBookingDetails> getUserPayments(Long userId) {
        return paymentRepository.findByUserId(userId);
    }

    public Optional<PaymentBookingDetails> getPaymentById(Long id) {
        return paymentRepository.findById(id);
    }
}