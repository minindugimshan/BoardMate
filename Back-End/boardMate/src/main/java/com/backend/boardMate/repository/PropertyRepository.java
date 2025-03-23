package com.backend.boardMate.repository;

import com.backend.boardMate.model.Property;
// import com.backend.boardMate.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {
}
