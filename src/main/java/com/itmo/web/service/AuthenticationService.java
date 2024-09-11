package com.itmo.web.service;

import com.itmo.web.dto.UserDto;
import com.itmo.web.dto.request.RefreshTokenDto;
import com.itmo.web.dto.request.SignUpDto;
import com.itmo.web.dto.response.TokenDto;
import com.itmo.web.entity.RefreshToken;
import com.itmo.web.entity.User;
import com.itmo.web.utils.mapper.UserMapper;
import com.itmo.web.repository.RefreshTokenRepository;
import com.itmo.web.repository.UserRepository;
import com.itmo.web.service.exceptions.InvalidRefreshTokenException;
import com.itmo.web.service.exceptions.UserAlreadyExist;
import com.itmo.web.service.exceptions.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final AuthenticationManager authenticationManager;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final UserRepository userRepository;
    private final JwtHelper jwtHelper;

    @Transactional
    public TokenDto authenticate(SignUpDto dto) {
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword()));
        User user = userRepository.findByUsername(dto.getUsername()).orElseThrow(() -> new UserNotFoundException("there is no user with this username"));
        return generateTokenDto(user);
    }

    @Transactional
    public TokenDto register(SignUpDto signUpDto) {
        User user = new User(signUpDto.getUsername(), passwordEncoder.encode(signUpDto.getPassword()));
        user.setRole("USER");
        if (userService.existByUsername(user.getUsername())) {
            throw new UserAlreadyExist("Username is taken");
        }
        userRepository.save(user);
        return generateTokenDto(user);

    }

    @Transactional
    public boolean logout(RefreshTokenDto refreshTokenDto) {
        String refreshTokenString = refreshTokenDto.getRefreshToken();
        if (jwtHelper.validateRefreshToken(refreshTokenString) && refreshTokenRepository.existsById(jwtHelper.getTokenIdFromRefreshToken(refreshTokenString))) {
            refreshTokenRepository.deleteById(jwtHelper.getTokenIdFromRefreshToken(refreshTokenString));
            return true;
        } else {
            throw new InvalidRefreshTokenException();
        }

    }

    @Transactional
    public boolean logoutAll(RefreshTokenDto refreshTokenDto) {
        String refreshTokenString = refreshTokenDto.getRefreshToken();
        if (jwtHelper.validateRefreshToken(refreshTokenString) && refreshTokenRepository.existsById(jwtHelper.getTokenIdFromRefreshToken(refreshTokenString))) {
            return refreshTokenRepository.deleteByUserId(Long.valueOf(jwtHelper.getUserIdFromRefreshToken(refreshTokenString)));
        } else {
            throw new InvalidRefreshTokenException();
        }
    }

    @Transactional
    public TokenDto generateAccessToken(TokenDto tokenDto) {
        String refreshTokenString = tokenDto.getRefreshToken();
        if (jwtHelper.validateRefreshToken(refreshTokenString) && refreshTokenRepository.existsById(jwtHelper.getTokenIdFromRefreshToken(refreshTokenString))) {

            UserDto user = userService.findById(Long.valueOf(jwtHelper.getUserIdFromRefreshToken(refreshTokenString)));
            String accessToken = jwtHelper.generateAccessToken(user.getId());
            return new TokenDto(user.getId(), accessToken, refreshTokenString);
        } else {
            throw new InvalidRefreshTokenException();
        }
    }

    @Transactional
    public TokenDto generateRefreshToken(TokenDto tokenDto) {
        String refreshTokenString = tokenDto.getRefreshToken();
        if (refreshTokenRepository.existsById(jwtHelper.getTokenIdFromRefreshToken(refreshTokenString))) {
            refreshTokenRepository.deleteById(jwtHelper.getTokenIdFromRefreshToken(refreshTokenString));
            UserDto userDto = userService.findById(Long.valueOf(jwtHelper.getUserIdFromRefreshToken(refreshTokenString)));
            User user = UserMapper.INSTANCE.toEntity(userDto);
            return generateTokenDto(user);
        } else {
            throw new InvalidRefreshTokenException();
        }

    }


    private TokenDto generateTokenDto(User user) {
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUser(user);
        refreshTokenRepository.save(refreshToken);
        String accessToken = jwtHelper.generateAccessToken(user.getId());
        String refreshTokenString = jwtHelper.generateRefreshToken(user.getId(), refreshToken.getId());
        return new TokenDto(user.getId(), accessToken, refreshTokenString);
    }

}
