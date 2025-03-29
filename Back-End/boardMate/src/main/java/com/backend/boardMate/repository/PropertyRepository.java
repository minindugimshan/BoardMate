package com.backend.boardMate.repository;

import com.backend.boardMate.model.Property;

import java.util.List;

// import com.backend.boardMate.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {
    List<Property> findByLandlordId(Integer landlordId);

    // jpa query for search using query for location, type, price range - each
    // parameter is optional
    @Query("SELECT p FROM Property p WHERE " +
            "(:location IS NULL OR p.location LIKE %:location%) AND " +
            "(:type IS NULL OR p.type LIKE %:type%) AND " +
            "(:minPrice IS NULL OR p.price >= :minPrice) AND " +
            "(:maxPrice IS NULL OR p.price <= :maxPrice)")
    List<Property> search(String location, String type, Double minPrice, Double maxPrice);
}