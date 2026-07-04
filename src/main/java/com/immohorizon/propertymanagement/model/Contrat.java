package com.immohorizon.propertymanagement.model;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="contrats")
public class Contrat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idContrat;
    @Column
    private Date dateDebut;
    @Column
    private int duree;
    @Column
    private Date dateFin;

}
