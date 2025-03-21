package com.example.boardMate.repository;

import com.example.boardMate.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByPropertyId(Long propertyId); // Find all reviews for a specific property
}