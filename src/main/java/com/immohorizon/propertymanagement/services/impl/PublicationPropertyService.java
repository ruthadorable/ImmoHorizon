package com.immohorizon.propertymanagement.services.impl;

import com.immohorizon.propertymanagement.Enum.PaiementTitle;
import com.immohorizon.propertymanagement.Enum.StatutPaiement;
import com.immohorizon.propertymanagement.dto.BienDto;
import com.immohorizon.propertymanagement.mapper.BienMapper;
import com.immohorizon.propertymanagement.model.Bien;
import com.immohorizon.propertymanagement.model.Paiement;
import com.immohorizon.propertymanagement.repository.BienRepository;
import com.immohorizon.propertymanagement.repository.PaiementRepository;
import com.immohorizon.propertymanagement.Enum.PropertyStatus;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

import static com.immohorizon.propertymanagement.Enum.PropertyStatus.PAYMENT_PENDING;

@Service
public class PublicationPropertyService {
    @Autowired
    private BienMapper mapper;
    @Autowired
    private  BienRepository propertyRepository;
    @Autowired
    private PaiementRepository paymentRepository;

    private static final long PUBLICATION_FEE = 150;

    @Transactional
    public Paiement preparePublicationPayment(
            BienDto request) {

        /*
         * 1. Create temporary property
         */

        Bien property = mapper.toEntity(request);

        // Property is NOT public yet
        property.setStatus(PAYMENT_PENDING);

        property = propertyRepository.save(property);


        /*
         * 2. Create Stripe Checkout Session
         */

        SessionCreateParams params =
                SessionCreateParams.builder()

                        .setMode(
                                SessionCreateParams.Mode.PAYMENT
                        )

                        .setSuccessUrl(
                                "https://www.immohorizon.be/payment/success"
                        )

                        .setCancelUrl(
                                "https://www.immohorizon.be/payment/cancel"
                        )

                        // Very important:
                        // associate Stripe payment with property
                        .putMetadata(
                                "propertyId",
                                String.valueOf(property.getIdBien())
                        )

                        .putMetadata(
                                "paymentType",
                                "FRAIS_PUBLICATION"
                        )

                        .addLineItem(
                                SessionCreateParams.LineItem.builder()
                                        .setQuantity(1L)
                                        .setPriceData(
                                                SessionCreateParams
                                                        .LineItem
                                                        .PriceData
                                                        .builder()
                                                        .setCurrency("eur")
                                                        .setUnitAmount(
                                                                PUBLICATION_FEE * 100
                                                        )
                                                        .setProductData(
                                                                SessionCreateParams
                                                                        .LineItem
                                                                        .PriceData
                                                                        .ProductData
                                                                        .builder()
                                                                        .setName(
                                                                                "Frais de publication ImmoHorizon"
                                                                        )
                                                                        .build()
                                                        )
                                                        .build()
                                        )
                                        .build()
                        )
                        .build();

        try {

            Session session =
                    Session.create(params);


            /*
             * 3. Save payment in database
             */

            Paiement payment = new Paiement();

            payment.setIdBien(property.getIdBien());
            payment.setSessionId(session.getId());
            payment.setMontant(PUBLICATION_FEE);
            payment.setCurrency("EUR");
            payment.setPaymentType(PaiementTitle.FRAIS_PUBLICATION);
            payment.setStatus(StatutPaiement.EN_COURS);

            paymentRepository.save(payment);


            /*
             * 4. Return Stripe URL to Angular
             */

            return Paiement.builder()
                    .idBien(property.getIdBien())
                    .sessionId(session.getId())
                    .checkoutUrl(session.getUrl())
                    .status(StatutPaiement.EN_COURS)
                    .build();

        } catch (Exception e) {

            throw new RuntimeException(
                    "Unable to create Stripe payment session",
                    e
            );
        }
    }
}