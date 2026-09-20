package com.immohorizon.propertymanagement.controller;

import com.immohorizon.propertymanagement.config.EnvConfig;
import com.immohorizon.propertymanagement.dto.PaymentRequest;
import com.immohorizon.propertymanagement.dto.StripeResponse;
import com.immohorizon.propertymanagement.services.StripeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment/v1")
@CrossOrigin(origins="${FRONTEND_URL}")
public class ProductCheckoutController {

    StripeService stripeService;
    @Autowired
    public ProductCheckoutController(StripeService stripeService){
        this.stripeService=stripeService;
    }

    @PostMapping("/checkout")
    public ResponseEntity<StripeResponse> checkoutPayment(@RequestBody PaymentRequest paymentRequest){
        StripeResponse stripeResponse= stripeService.checkoutProducts(paymentRequest);
        return ResponseEntity.status(HttpStatus.OK).body(stripeResponse);
    }
}
