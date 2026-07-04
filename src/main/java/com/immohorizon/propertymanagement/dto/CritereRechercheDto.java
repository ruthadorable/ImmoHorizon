package com.immohorizon.propertymanagement.dto;

import lombok.Data;

@Data
public class CritereRechercheDto {

    private String ville;
    private String type;
    private Double prixMin;
    private Double prixMax;
    private Integer surfaceMin;
    private Integer nbPieces;
}