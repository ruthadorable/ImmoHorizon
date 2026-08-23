package com.immohorizon.propertymanagement.dto;

import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Data;

@Data
public class BannerDto {

    private Long id;

    private String title;

    private String subtitle;

    private String description;

    private String image;

    private String buttonText;

    private String buttonLink;

    private String secondaryButtonText;

    private String secondaryButtonLink;

    private Boolean active = true;

    private Integer displayOrder = 1;
}
