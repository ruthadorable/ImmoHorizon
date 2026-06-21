package dto;

import lombok.Data;

@Data
public class UserDto {
    private int idUser;
    private int idRole;
    private String nom;
    private String prenom;
    private String email;
    private String noGsm;
}