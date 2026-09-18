package com.immohorizon.propertymanagement.model;


import com.immohorizon.propertymanagement.Enum.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true)
    private int idUser;
    @Column
    @Enumerated(EnumType.STRING)
    private Role role;

    @Column
    private String nom;
    @Column
    private String prenom;
    @NotBlank(message="email is required!")
    @Column(unique= true)
    private String email;
    @NotBlank(message="password is required!")
    @Column
    private String password;
    @Column
    private String noGsm;
    @Transient
    private String token;

    public String getNoGsm() {
        return noGsm;
    }

    public void setNoGsm(String noGsm) {
        this.noGsm = noGsm;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public int getIdUser() {
        return idUser;
    }

    public void setIdUser(int idUser) {
        this.idUser = idUser;
    }
}

