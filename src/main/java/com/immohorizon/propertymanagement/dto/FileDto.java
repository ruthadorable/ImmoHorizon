package com.immohorizon.propertymanagement.dto;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class FileDto {
    private Integer id;
    private String name;
    private String fileUrl;
}
