package com.itmo.web.service;

import com.itmo.web.dto.UserDto;
import com.itmo.web.entity.User;
import com.itmo.web.utils.mapper.UserMapper;
import com.itmo.web.repository.UserRepository;
import com.itmo.web.service.exceptions.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserDto findById(Long id) {
        User user = userRepository
                .findById(id)
                .orElseThrow(()->new UserNotFoundException("there is no user with this id"));
        return UserMapper.INSTANCE.toDto(user);
    }

    public boolean existById(Long id) {
        return userRepository
                .existsById(id);
    }

    public UserDto findByUsername(String username){
        User user = userRepository
                .findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("there is no user with this username"));
        return UserMapper.INSTANCE.toDto(user);
    }

    public boolean existByUsername(String username){
        return userRepository.existsByUsername(username);
    }


}
