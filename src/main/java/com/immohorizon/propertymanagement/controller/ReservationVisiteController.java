package com.immohorizon.propertymanagement.controller;

import com.immohorizon.propertymanagement.dto.ReservationVisiteRequest;
import com.immohorizon.propertymanagement.dto.ReservationVisiteResponse;
import com.immohorizon.propertymanagement.model.ReservationVisite;
import com.immohorizon.propertymanagement.services.ReservationVisiteService;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/reservation-visite")
@CrossOrigin(origins="http://localhost:4200")
public class ReservationVisiteController {

    private final ReservationVisiteService reservationService;

    public ReservationVisiteController(
            ReservationVisiteService reservationService) {

        this.reservationService = reservationService;
    }

    // Créer une demande de visite
    @PostMapping(value = "/creer",
    consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ReservationVisiteResponse> creerReservation(
            @Valid @RequestPart("reservation") ReservationVisiteRequest request,
            @RequestPart(value = "documents", required = false) List<MultipartFile> documents ) throws Exception {

        ReservationVisite reservation =
                null;
        try {
            reservation = reservationService.creerReservation(request, documents);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        ReservationVisiteResponse response =
                new ReservationVisiteResponse(
                        reservation.getIdReservation(),
                        reservation.getStatut().toString(),
                        "Votre demande de visite a été envoyée avec succès."
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
}