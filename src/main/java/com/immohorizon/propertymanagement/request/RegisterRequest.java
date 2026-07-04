package com.immohorizon.propertymanagement.request;

import com.immohorizon.propertymanagement.Enum.Role;

public class RegisterRequest {
    public String email;
    public String password;
    public String nom;
    public String prenom;
    public String noGsm;
    public Role role;
    public int id_role;
}
