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
    private int idUser;
    @Column
    private int idRole;
    @Column
    private String nom;
    @Column
    private String prenom;
    @Column(unique= true)
    private String email;
    @Transient
    private String password;
    @Column
    private String noGsm;
}

