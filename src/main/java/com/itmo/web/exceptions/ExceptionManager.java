package com.itmo.web.exceptions;

import com.itmo.web.dto.response.ErrorResponseDto;
import com.itmo.web.service.exceptions.InvalidRefreshTokenException;
import com.itmo.web.service.exceptions.UserAlreadyExist;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Log4j2
@ControllerAdvice
public class ExceptionManager {

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<?> handleBadCredentialsException(BadCredentialsException e){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponseDto(e.getMessage()));
    }

    @ExceptionHandler(InvalidRefreshTokenException.class)
    public ResponseEntity<?> handleInvalidRefreshTokenException(InvalidRefreshTokenException e){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponseDto(e.getMessage()));
    }

    @ExceptionHandler(UserAlreadyExist.class)
    public ResponseEntity<?> handleUserAlreadyExist(UserAlreadyExist e){
        return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponseDto(e.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleMethodArgumentNotValidException(MethodArgumentNotValidException e){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponseDto(e.getMessage()));
    }

}
