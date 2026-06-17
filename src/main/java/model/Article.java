package model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="articles")
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idArticle;
    @Column
    private String titre;
    @Column
    private String contenu;
    @Column
    private long image;


}
