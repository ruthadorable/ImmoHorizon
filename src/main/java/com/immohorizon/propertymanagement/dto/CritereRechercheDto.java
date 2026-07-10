package com.immohorizon.propertymanagement.dto;

import lombok.Data;

@Data
public class CritereRechercheDto {

    private String commune;
    private String type;
    private String typeDeBien;
    private Double minPrix;
    private Double maxPrix;
    private Integer minSuperficie;
    private Integer maxSuperficie;
    private Integer chambres;
    private Integer salleDeBain;
    private Integer etages;
    private Boolean disponible;
    private Boolean meuble;
    private Boolean terrasse;
    private Boolean jardin;
    private Boolean parking;
    private Boolean garage;
    private Boolean cave;
    private Boolean ascenseur;
    private Integer surfaceJarTerrasse;
    private int anneeDeConstruction;
    private String etat;
    private String peb;

}