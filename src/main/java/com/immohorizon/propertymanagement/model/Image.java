package com.immohorizon.propertymanagement.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_bien")
    @JsonIgnore
    private Bien bien;
    public void setBien(Bien bien){
        this.bien = bien;
    }

}
