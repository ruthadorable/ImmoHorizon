package com.immohorizon.propertymanagement.dto;

import com.immohorizon.propertymanagement.Enum.PaiementTitle;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentRequest {

    private long id;

    private PaiementTitle paymentType;

    private String nom;

    private long montant;
}
