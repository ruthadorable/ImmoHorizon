package com.immohorizon.propertymanagement.dto;

import com.immohorizon.propertymanagement.model.Document;
import com.immohorizon.propertymanagement.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CandidatureDto {

    private long idDossier;

    private long idRefBien;

    private boolean dossierComplet;

    private User utilisateur;

    private List<Document> documents = new ArrayList<>();

}
