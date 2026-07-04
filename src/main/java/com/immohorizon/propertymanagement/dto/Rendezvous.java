package com.immohorizon.propertymanagement.dto;

import com.immohorizon.propertymanagement.model.Bien;
import com.immohorizon.propertymanagement.model.User;
import jakarta.persistence.Column;
import jakarta.persistence.OneToOne;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Rendezvous {
    private long idRendezvous;

    private User employe;

    private LocalDateTime date_heure;

    private Bien bien;

    private User candidat;

    private  boolean confirmation;

    private boolean annulation;
}
