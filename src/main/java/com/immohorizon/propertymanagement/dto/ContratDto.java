package com.immohorizon.propertymanagement.dto;

import jakarta.persistence.Column;
import lombok.Data;

import java.sql.Date;
@Data
public class ContratDto {

    private long idContrat;

    private Date dateDebut;

    private int duree;

    private Date dateFin;

}
