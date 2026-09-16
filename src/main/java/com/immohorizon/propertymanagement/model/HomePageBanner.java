package com.immohorizon.propertymanagement.model;


import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "homepage_banner")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HomePageBanner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(length = 300)
    private String subtitle;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String image;

    @Column(length = 100)
    private String buttonText;

    @Column(length = 255)
    private String buttonLink;

    @Column(length = 100)
    private String secondaryButtonText;

    @Column(length = 255)
    private String secondaryButtonLink;

    @Column(nullable = false)
    @Builder.Default
    private Boolean active = true;

    @Column(nullable = false)
    @Builder.Default
    private Integer displayOrder = 1;

}
