package com.immohorizon.propertymanagement.dto;

import com.immohorizon.propertymanagement.model.File;
import com.immohorizon.propertymanagement.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BienDto {

        private long idBien;

        private String title;

        private  String typeDeBien;

        private String description;
        private String type;

        private double prix;

        private double superficie;

        private int chambres;

        private String peb;

        private int energieTotale;

        private int energieSpecifique;

        private int emissionCO2;

        private String rue;

        private int numero;

        private int code_postal;

        private String commune;

        private int facades;

        private long annee_construction;

        private String type_chauffage;

        private java.time.LocalDate disponibilite;

        private String etat;

        private int etages;

        private boolean parking;

        private boolean garage;

        private boolean ascenceur;

        private boolean jardin;

        private boolean terrasse;

        private boolean cave;

        private int surfaceHabitable;

        private int surfaceJardinTerrasse;

        private boolean disponible;

        private User proprietaire;

        private User locataire;

        private List<File> images;
}
