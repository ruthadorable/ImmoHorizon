package com.immohorizon.propertymanagement.model;


import com.immohorizon.propertymanagement.Enum.PaiementTitle;
import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Getter
@Setter
public class Paiement{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true)
    private long idTransaction;
    @Enumerated(EnumType.STRING)
    private PaiementTitle intitule;
    @Column
    private double montant;
}
