package com.immohorizon.propertymanagement.model;
import com.immohorizon.propertymanagement.Enum.StatutReservation;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "reservation_visites")
@Getter
@Setter
public class ReservationVisite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idReservation;

    // Bien immobilier concerné
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bien_id", nullable = false)
    private Bien bien;

    // Identifiants facultatifs
    private Long candidatId;

    private Long agentId;

    // Date et heure de la visite
    @Column(nullable = false)
    private LocalDate dateVisite;

    @Column(nullable = false)
    private LocalTime heureVisite;

    // Coordonnées du candidat
    @Column(nullable = false)
    private String prenom;

    @Column(nullable = false)
    private String nom;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String telephone;

    // Informations complémentaires
    private LocalDate dateEntree;

    private Integer occupants;

    private Integer enfants;

    private String animaux;

    private String revenuSuffisant;

    private String garant;

    @Column(columnDefinition = "TEXT")
    private String commentaires;

    // Document joint
    @OneToMany(
            mappedBy = "reservation",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Document> documents = new ArrayList<>();

    // Statut de la réservation
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatutReservation statut;

    // Date de création
    private LocalDateTime dateCreation;

    @PrePersist
    public void prePersist() {
        dateCreation = LocalDateTime.now();

        if (statut == null) {
            statut = StatutReservation.EN_ATTENTE;
        }
    }

    public void ajouterDocument(Document document) {
        documents.add(document);
        document.setReservation(this);
    }
}
