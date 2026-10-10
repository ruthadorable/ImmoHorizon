package com.immohorizon.propertymanagement.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UpdateUserRequest(
        @NotBlank String firstName,
        @NotBlank String lastName,

        @NotBlank
        @Email
        String email,

        @NotBlank String role,
        boolean enabled
) {}