package com.immohorizon.propertymanagement.model;

import com.immohorizon.propertymanagement.dto.UserDto;
import jakarta.persistence.*;
import lombok.*;

@Data
@Setter
@Getter
@NoArgsConstructor
public class LoginResponse {
    private String jwtToken;
    private UserDto user;

    public LoginResponse(String jwtToken, UserDto user) {
        this.jwtToken = jwtToken;
        this.user = user;
    }

    public UserDto getUser() {
        return user;
    }

    public String getToken() {
        return jwtToken;
    }
}

