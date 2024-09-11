package com.itmo.web.utils.mapper;

import com.itmo.web.dto.UserDto;
import com.itmo.web.entity.User;
import com.itmo.web.security.userDetails.CustomUserDetails;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    User toEntity(UserDto userDto);
    UserDto toUser(CustomUserDetails customUserDetails);
    UserDto toDto(User user);
}
