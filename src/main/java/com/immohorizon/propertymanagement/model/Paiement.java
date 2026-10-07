package com.immohorizon.propertymanagement.model;


import com.immohorizon.propertymanagement.Enum.PaiementTitle;
import com.immohorizon.propertymanagement.Enum.StatutPaiement;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

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
    @Column
    String sessionId;
    @Column
    String checkoutUrl;
    @Column
    private Long idUser;
    @Column
    private Long idBien;
    @Enumerated(EnumType.STRING)
    private PaiementTitle intitule;
    @Column
    private long montant;
    @Column
    private String currency;
    @Column
    private String stripePaymentIntentId;
    @Column
    @Enumerated(EnumType.STRING)
    private PaiementTitle paymentType;
    @Column
    @Enumerated(EnumType.STRING)
    private StatutPaiement status;
    @Column
    private LocalDateTime createdAt;
    @Column
    private LocalDateTime paidAt;
}
