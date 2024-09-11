package com.itmo.web.dto;

import lombok.Value;

@Value
public class UserDto {
     long id;
     String username;
     String password;
     String role;


}
