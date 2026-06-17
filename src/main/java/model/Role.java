package model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name="roles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idRole;

    @Column
    private String nomRole;

    @Column
    private String description;


}
