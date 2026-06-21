package model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="candidatures")
public class Candidature {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idDossier;
    @Column
    private long idRefBien;
    @Column
    private boolean dossierComplet;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "utilisateur_id")
    private User utilisateur;

    @OneToMany(
            mappedBy = "candidature",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Document> documents = new ArrayList<>();

    @PrePersist
    public void prePersist() {
        LocalDateTime createdAt = LocalDateTime.now();
    }

    public void addDocument(Document document) {
        documents.add(document);
       // documents.setCandidature(this);
    }

    public void removeDocument(Document document) {
        documents.remove(document);
        //document.setCandidature(null);
    }


}
