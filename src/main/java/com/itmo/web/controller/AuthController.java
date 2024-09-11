package com.itmo.web.controller;

import com.itmo.web.dto.request.RefreshTokenDto;
import com.itmo.web.dto.request.SignUpDto;
import com.itmo.web.dto.response.TokenDto;
import com.itmo.web.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationService authenticateService;


    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody SignUpDto signUpDto) {
        return ResponseEntity.ok(authenticateService.authenticate(signUpDto));
    }


    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignUpDto signUpDto) {
        return ResponseEntity.ok(authenticateService.register(signUpDto));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody RefreshTokenDto refreshToken) {
        return ResponseEntity.ok(authenticateService.logout(refreshToken));
    }

    @PostMapping("/logout-all")
    public ResponseEntity<?> logoutAll(@RequestBody RefreshTokenDto refreshToken) {
        return ResponseEntity.ok(authenticateService.logoutAll(refreshToken));
    }

    @PostMapping("/access-token")
    public ResponseEntity<?> accessToken(@RequestBody TokenDto tokenDto) {
        return ResponseEntity.ok(authenticateService.generateAccessToken(tokenDto));

    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody TokenDto tokenDto) {
        return ResponseEntity.ok(authenticateService.generateRefreshToken(tokenDto));
    }

}
