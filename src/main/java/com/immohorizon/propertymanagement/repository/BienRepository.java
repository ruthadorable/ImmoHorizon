package com.immohorizon.propertymanagement.repository;

import com.immohorizon.propertymanagement.model.Bien;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BienRepository extends JpaRepository<Bien,Long> {
    List<Bien> findByCommuneContainingIgnoreCaseOrTypeDeBienContainingIgnoreCase(
            String commune,
            String typeDeBien
    );
}
