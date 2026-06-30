package com.immohorizon.propertymanagement.repository;

import com.immohorizon.propertymanagement.model.Bien;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BienRepository extends JpaRepository<Bien,Long> {
}
