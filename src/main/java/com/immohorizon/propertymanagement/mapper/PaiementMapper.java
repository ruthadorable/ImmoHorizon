package com.immohorizon.propertymanagement.mapper;

import com.immohorizon.propertymanagement.dto.PaymentRequest;
import com.immohorizon.propertymanagement.model.Paiement;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PaiementMapper {

    PaymentRequest toDto(Paiement paiement);

    Paiement toEntity(PaymentRequest paymentRequest);
}
