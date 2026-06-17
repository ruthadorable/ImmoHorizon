package model;


import jakarta.persistence.*;
import lombok.*;


@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="users")
public class User {
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
}

