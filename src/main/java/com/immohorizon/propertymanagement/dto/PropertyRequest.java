package com.immohorizon.propertymanagement.dto;

import lombok.Data;

@Data
public class PropertyRequest {
    private String title;
    private String description;
    private int prix;
    private String commune;
}
