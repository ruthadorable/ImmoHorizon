package com.immohorizon.propertymanagement.services;

import com.immohorizon.propertymanagement.config.EnvConfig;
import com.immohorizon.propertymanagement.dto.PaymentRequest;
import com.immohorizon.propertymanagement.dto.StripeResponse;
import com.stripe.Stripe;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.couchbase.CouchbaseProperties;
import org.springframework.stereotype.Service;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;


@Service
public class StripeService {


    private String stripeSecretKey= EnvConfig.get("STRIPE_SECRET_KEY");


    private String frontendUrl = EnvConfig.get("FRONTEND_URL");

    /**
     * Creates a Stripe Checkout Session.
     *
     * The amount must be expressed in the smallest currency unit:
     * EUR -> cents
     *
     * Example:
     * 150.00 EUR -> 15000
     */
    public StripeResponse checkoutProducts(PaymentRequest paymentRequest) {

        Stripe.apiKey = stripeSecretKey;

        try {

            // Product displayed on Stripe Checkout
            SessionCreateParams.LineItem.PriceData.ProductData productData =
                    SessionCreateParams.LineItem.PriceData.ProductData.builder()
                            .setName(paymentRequest.getNom())
                            .build();

            // Price
            SessionCreateParams.LineItem.PriceData priceData =
                    SessionCreateParams.LineItem.PriceData.builder()
                            .setCurrency("eur")
                            .setUnitAmount(paymentRequest.getMontant())
                            .setProductData(productData)
                            .build();

            // Line item
            SessionCreateParams.LineItem lineItem =
                    SessionCreateParams.LineItem.builder()
                            .setPriceData(priceData)
                            .setQuantity(1L)
                            .build();

            // Checkout session
            SessionCreateParams params =
                    SessionCreateParams.builder()
                            .setMode(SessionCreateParams.Mode.PAYMENT)

                            .addLineItem(lineItem)

                            // User returns here after successful payment
                            .setSuccessUrl(
                                    frontendUrl
                                            + "/payment/success?session_id={CHECKOUT_SESSION_ID}"
                            )

                            // User cancels payment
                            .setCancelUrl(
                                    frontendUrl
                                            + "/payment/cancel"
                            )

                            // Useful information for the webhook
                            .putMetadata(
                                    "paymentType",
                                    paymentRequest.getPaymentType().toString()
                            )

                            .putMetadata(
                                    "propertyId",
                                    String.valueOf(paymentRequest.getId())
                            )

                            .build();

            Session session = Session.create(params);

            return StripeResponse.builder()
                    .status("SUCCESS")
                    .message("Checkout session created successfully")
                    .sessionId(session.getId())
                    .sessionUrl(session.getUrl())
                    .build();

        } catch (StripeException e) {

            return StripeResponse.builder()
                    .status("ERROR")
                    .message("Unable to create Stripe checkout session: "
                            + e.getMessage())
                    .build();
        }
    }
}
