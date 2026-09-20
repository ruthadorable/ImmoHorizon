package com.immohorizon.propertymanagement.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContratDto {

    private long idContrat;

    private Date dateDebut;

    private int duree;

    private Date dateFin;

}
