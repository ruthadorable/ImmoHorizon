package com.immohorizon.propertymanagement.dto;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ArticleDto {

    private long idArticle;

    private String image;

    private String link;

    private String title;

    private String category;

    private String description;

    private String slug;

    private boolean featured;

    private String content;

    private String author;

    private int readingTime;

    private LocalDate publishedDate;

    public ArticleDto(String title, String link, String image, String description, String content){
        this.title=title;
        this.link=link;
        this.image=image;
        this.description=description;
        this.content=content;
    }
}
