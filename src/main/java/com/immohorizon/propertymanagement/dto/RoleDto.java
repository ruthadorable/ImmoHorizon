package com.immohorizon.propertymanagement.dto;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class RoleDto {
    private long idRole;

    private String nomRole;

    private String description;
}
