package com.immohorizon.propertymanagement.dto;

import com.immohorizon.propertymanagement.Enum.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private int idUser;
    private Role role;
    private String nom;
    private String prenom;
    private String email;
    private String noGsm;
}