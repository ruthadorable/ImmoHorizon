package com.immohorizon.propertymanagement.dto;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
public class ArticleDto {

    private long idArticle;

    private String titre;

    private String contenu;

    private long image;

}
