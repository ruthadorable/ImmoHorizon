package com.immohorizon.propertymanagement.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private boolean isPrimary;

    private String imageKey; // S3 key (recommended)

    private String url; // optional (can be generated instead)

    @ManyToOne
    @JoinColumn(name = "id_bien")
    private Bien bien;
}
