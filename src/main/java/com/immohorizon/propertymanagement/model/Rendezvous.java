package com.immohorizon.propertymanagement.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
@Table
public class Rendezvous {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idRendezvous;
    @OneToOne
    private User employe;
    @Column
    private LocalDateTime date_heure;
    @OneToOne
    private Bien bien;
    @OneToOne
    private User candidat;
    @Column
    private  boolean confirmation;
    @Column
    private boolean annulation;
}
