package com.immohorizon.propertymanagement.mapper;

import com.immohorizon.propertymanagement.dto.UserDto;
import com.immohorizon.propertymanagement.model.LoginRequest;
import com.immohorizon.propertymanagement.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    LoginRequest toDto(User user);

    User toEntity(LoginRequest dto);
}