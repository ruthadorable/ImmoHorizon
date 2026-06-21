package model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="users")
public class LoginResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idUser;
    @Column
    private int idRole;
    @Column
    private String nom;
    @Column
    private String prenom;
    @Column
    private String email;
    @Transient
    private String password;
    @Column
    private String noGsm;
    @Transient
    private String token;
}


