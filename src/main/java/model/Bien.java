package model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
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

    public List<Long> getImages() {
        return images;
    }

    public void setImages(List<Long> images) {
        this.images = images;
    }

    public User getLocataire() {
        return locataire;
    }

    public void setLocataire(User locataire) {
        this.locataire = locataire;
    }

    public User getProprietaire() {
        return proprietaire;
    }

    public void setProprietaire(User proprietaire) {
        this.proprietaire = proprietaire;
    }

    public boolean isDisponible() {
        return disponible;
    }

    public void setDisponible(boolean disponible) {
        this.disponible = disponible;
    }

    public int getSurfaceJardinTerrasse() {
        return surfaceJardinTerrasse;
    }

    public void setSurfaceJardinTerrasse(int surfaceJardinTerrasse) {
        this.surfaceJardinTerrasse = surfaceJardinTerrasse;
    }

    public int getSurfaceHabitable() {
        return surfaceHabitable;
    }

    public void setSurfaceHabitable(int surfaceHabitable) {
        this.surfaceHabitable = surfaceHabitable;
    }

    public boolean isCave() {
        return cave;
    }

    public void setCave(boolean cave) {
        this.cave = cave;
    }

    public boolean isTerrasse() {
        return terrasse;
    }

    public void setTerrasse(boolean terrasse) {
        this.terrasse = terrasse;
    }

    public boolean isJardin() {
        return jardin;
    }

    public void setJardin(boolean jardin) {
        this.jardin = jardin;
    }

    public boolean isGarage() {
        return garage;
    }

    public void setGarage(boolean garage) {
        this.garage = garage;
    }

    public boolean isParking() {
        return parking;
    }

    public void setParking(boolean parking) {
        this.parking = parking;
    }

    public int getEtages() {
        return etages;
    }

    public void setEtages(int etages) {
        this.etages = etages;
    }

    public String getEtat() {
        return etat;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }

    public LocalDate getDisponibilité() {
        return disponibilité;
    }

    public void setDisponibilité(LocalDate disponibilité) {
        this.disponibilité = disponibilité;
    }

    public long getAnnee_construction() {
        return annee_construction;
    }

    public void setAnnee_construction(long annee_construction) {
        this.annee_construction = annee_construction;
    }

    public int getFacades() {
        return facades;
    }

    public void setFacades(int facades) {
        this.facades = facades;
    }

    public String getCommune() {
        return commune;
    }

    public void setCommune(String commune) {
        this.commune = commune;
    }

    public int getCode_postal() {
        return code_postal;
    }

    public void setCode_postal(int code_postal) {
        this.code_postal = code_postal;
    }

    public int getNumero() {
        return numero;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

    public String getRue() {
        return rue;
    }

    public void setRue(String rue) {
        this.rue = rue;
    }

    public int getEmissionCO2() {
        return emissionCO2;
    }

    public void setEmissionCO2(int emissionCO2) {
        this.emissionCO2 = emissionCO2;
    }

    public int getEnergieSpecifique() {
        return energieSpecifique;
    }

    public void setEnergieSpecifique(int energieSpecifique) {
        this.energieSpecifique = energieSpecifique;
    }

    public int getEnergieTotale() {
        return energieTotale;
    }

    public void setEnergieTotale(int energieTotale) {
        this.energieTotale = energieTotale;
    }

    public char getPeb() {
        return peb;
    }

    public void setPeb(char peb) {
        this.peb = peb;
    }

    public int getChambres() {
        return chambres;
    }

    public void setChambres(int chambres) {
        this.chambres = chambres;
    }

    public double getSuperficie() {
        return superficie;
    }

    public void setSuperficie(double superficie) {
        this.superficie = superficie;
    }

    public double getPrix() {
        return prix;
    }

    public void setPrix(double prix) {
        this.prix = prix;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTypeDeBien() {
        return typeDeBien;
    }

    public void setTypeDeBien(String typeDeBien) {
        this.typeDeBien = typeDeBien;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public long getIdBien() {
        return idBien;
    }

    public void setIdBien(long idBien) {
        this.idBien = idBien;
    }
}
