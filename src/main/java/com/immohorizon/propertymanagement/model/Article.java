package com.immohorizon.propertymanagement.model;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.time.LocalDate;

@Data
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="articles")
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idArticle;
    @Column
    private String title;
    @Column
    private String link;
    @Column
    private String category;
    @Lob
    @Column(columnDefinition = "MEDIUMTEXT")
    private String description;
    @Column
    private String slug;
    @Column
    private boolean featured;
    @Lob
    @Column(columnDefinition = "MEDIUMTEXT")
    private String content;
    @Column
    private String image;
    @Column
    private String author;
    @Column
    private int readingTime;
    @Column
    private LocalDate publishedDate;


}
