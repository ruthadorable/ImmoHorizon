package com.immohorizon.propertymanagement.repository;

import com.immohorizon.propertymanagement.Enum.StatutPaiement;
import com.immohorizon.propertymanagement.model.Paiement;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;
import java.util.Optional;


public interface PaiementRepository extends JpaRepository<Paiement, Long> {

    // Find a payment using the Stripe Checkout Session ID
    Optional<Paiement> findBySessionId(String sessionId);

    // Find all payments associated with a property
    List<Paiement> findByIdBien(Long propertyId);

    // Find payments by property and payment status
    List<Paiement> findByIdBienAndStatus(
            Long IdBien,
            StatutPaiement status
    );

    // Find all payments with a specific status
    List<Paiement> findByStatus(StatutPaiement status);

    // Check whether a Stripe Checkout Session has already been recorded
    boolean existsBySessionId(String sessionId);
}