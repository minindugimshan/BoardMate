package com.backend.boardMate.repository;

import com.backend.boardMate.model.PaymentBookingDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentBookingRepository extends JpaRepository<PaymentBookingDetails, Long> {
}