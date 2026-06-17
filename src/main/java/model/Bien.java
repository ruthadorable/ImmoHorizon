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
    private String rue;
    @Column
    private String numero;
    @Column
    private int code_postal;
    @Column
    private String commune;
    @Column
    private int nbfacades;
    @Column
    private long annee_construction;
    @Column
    private java.sql.Date disponibilité;
    @Column
    private String etat;
    @Column
    private int etages;
    @Column
    private boolean garage;
    @Column
    private boolean jardin;
    @Column
    private boolean terasse;
    @Column
    private boolean cave;
    @Column
    private int surface_habitable;
    @Column
    private int surface_jardin;
    @OneToOne
    private User proprietaire;
    @OneToOne
    private User locataire;
    @OneToMany
    private List<Long> images;





}
