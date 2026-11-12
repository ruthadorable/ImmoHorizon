package com.immohorizon.propertymanagement.repository;


import com.immohorizon.propertymanagement.Enum.StatutReservation;
import com.immohorizon.propertymanagement.model.ReservationVisite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationVisiteRepository extends JpaRepository<ReservationVisite, Long> {

    // Récupérer les réservations d'un bien
    List<ReservationVisite> findByBien_IdBien(Long bienId);

    // Récupérer les demandes d'un candidat
    List<ReservationVisite> findByCandidatId(Long candidatId);

    // Récupérer les demandes d'un agent
    List<ReservationVisite> findByAgentId(Long agentId);

    // Récupérer les réservations selon leur statut
    List<ReservationVisite> findByStatut(StatutReservation statut);
}
