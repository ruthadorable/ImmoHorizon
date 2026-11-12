package com.immohorizon.propertymanagement.dto;

import com.immohorizon.propertymanagement.model.Document;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationVisiteRequest{

    @NotNull
    private Long bienId;

    private Long candidatId;

    private Long agentId;

    @NotNull
    @FutureOrPresent
    private LocalDate dateVisite;

    @NotNull
    private LocalTime heureVisite;

    @NotBlank
    private String prenom;

    @NotBlank
    private String nom;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String telephone;

    private LocalDate dateEntree;

    @NotNull
    @Min(1)
    private Integer occupants;

    @Min(0)
    private Integer enfants;

    private String animaux;

    private String revenuSuffisant;

    private String garant;

    private String commentaires;

    private List<Document> documents;


}