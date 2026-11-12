package com.immohorizon.propertymanagement.services;

import com.immohorizon.propertymanagement.Enum.StatutReservation;
import com.immohorizon.propertymanagement.dto.DocumentDto;
import com.immohorizon.propertymanagement.dto.ReservationVisiteRequest;
import com.immohorizon.propertymanagement.model.Bien;
import com.immohorizon.propertymanagement.model.Document;
import com.immohorizon.propertymanagement.model.ReservationVisite;
import com.immohorizon.propertymanagement.repository.BienRepository;
import com.immohorizon.propertymanagement.repository.ReservationVisiteRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReservationVisiteService {

    private final ReservationVisiteRepository reservationRepository;
    private final BienRepository bienRepository;
    private S3Service s3Service;

    public ReservationVisiteService(
            ReservationVisiteRepository reservationRepository,
            BienRepository bienRepository,
            S3Service s3Service) {

        this.reservationRepository = reservationRepository;
        this.bienRepository = bienRepository;
        this.s3Service=s3Service;
    }


    @Transactional
    public ReservationVisite creerReservation(
            ReservationVisiteRequest request,
            List<MultipartFile> documents) throws Exception{

        // 1. Vérifier que le bien existe
        Bien bien = bienRepository.findById(request.getBienId())
                .orElseThrow(() ->
                        new EntityNotFoundException(
                                "Bien immobilier introuvable"
                        )
                );

        // 2. Vérifier la date et l'heure
        LocalDateTime dateHeureVisite = LocalDateTime.of(
                request.getDateVisite(),
                request.getHeureVisite()
        );

        if (dateHeureVisite.isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException(
                    "La date de visite doit être dans le futur"
            );
        }

        // 3. Créer la réservation
        ReservationVisite reservation = new ReservationVisite();

        reservation.setBien(bien);
        reservation.setCandidatId(request.getCandidatId());
        reservation.setAgentId(request.getAgentId());

        reservation.setDateVisite(request.getDateVisite());
        reservation.setHeureVisite(request.getHeureVisite());

        reservation.setPrenom(request.getPrenom());
        reservation.setNom(request.getNom());
        reservation.setEmail(request.getEmail());
        reservation.setTelephone(request.getTelephone());

        reservation.setDateEntree(request.getDateEntree());
        reservation.setOccupants(request.getOccupants());
        reservation.setEnfants(request.getEnfants());

        reservation.setAnimaux(request.getAnimaux());
        reservation.setRevenuSuffisant(request.getRevenuSuffisant());
        reservation.setGarant(request.getGarant());

        reservation.setCommentaires(request.getCommentaires());

        // 4. Définir le statut initial
        reservation.setStatut(StatutReservation.EN_ATTENTE);

        // 5. Envoyer les documents vers AWS S3
        if (documents != null && !documents.isEmpty()) {

            for (MultipartFile fichier : documents) {

                if (fichier == null || fichier.isEmpty()) {
                    continue;
                }

                // Upload du fichier dans AWS S3
                // Cette méthode doit retourner la clé S3 du fichier.
                String s3Key = s3Service.uploadFile(fichier);

                // Créer les métadonnées du document
                Document document = new Document();

                document.setFileName(fichier.getOriginalFilename());
                document.setOriginalFileName(fichier.getOriginalFilename());
                document.setContentType(fichier.getContentType());
                document.setSize(fichier.getSize());

                // Enregistrer la référence S3
                document.setS3Key(s3Key);

                // Bucket privé : ne pas stocker une URL publique permanente
                document.setFileUrl(null);

                document.setUploadedAt(LocalDateTime.now());

                // Associer le document à la réservation
                reservation.ajouterDocument(document);
            }
        }

        // 6. Enregistrer la réservation et ses documents dans MySQL
        // Le cascade = CascadeType.ALL permet de sauvegarder les documents.
        return reservationRepository.save(reservation);
    }

}