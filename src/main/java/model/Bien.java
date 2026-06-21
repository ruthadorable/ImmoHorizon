package model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name="biens")
public class Bien {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idBien;
    @Column
    private String title;
    @Column
    private  String typeDeBien;
    @Column
    private String description;
    @Column
    private double prix;
    @Column
    private double superficie;
    @Column
    private int chambres;
    @Column
    private char peb;
    @Column
    private int energieTotale;
    @Column
    private int energieSpecifique;
    @Column
    private int emissionCO2;
    @Column
    private String rue;
    @Column
    private int numero;
    @Column
    private int code_postal;
    @Column
    private String commune;
    @Column
    private int facades;
    @Column
    private long annee_construction;
    @Column(name = "disponibilite")
    private java.time.LocalDate disponibilité;
    @Column
    private String etat;
    @Column
    private int etages;
    @Column
    private boolean parking;
    @Column
    private boolean garage;
    @Column
    private boolean jardin;
    @Column
    private boolean terrasse;
    @Column
    private boolean cave;
    @Column
    private int surfaceHabitable;
    @Column
    private int surfaceJardinTerrasse;
    @Column
    private boolean disponible;
    @OneToOne
    private User proprietaire;
    @OneToOne
    private User locataire;
    @OneToMany
    private List<Long> images;





}
