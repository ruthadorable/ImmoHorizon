package com.immohorizon.propertymanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReservationVisiteResponse{

        Long id;

        // Informations du bien
        Long bienId;
        String titreBien;

        // Informations du demandeur
        String nom;
        String prenom;
        String email;
        String telephone;

        // Informations de la visite
        LocalDate dateVisite;
        LocalTime heureVisite;

        // Occupants
        Integer nombreOccupants;

        // Informations complémentaires
        String message;
        String statut;

        // Documents associés
        List<DocumentDto> documents;

        // Date de création
        LocalDateTime dateCreation;



    public ReservationVisiteResponse(
            Long id, String statut, String message
    ) {
        this.id=id;
        this.statut=statut;
        this.message=message;
    }

}
