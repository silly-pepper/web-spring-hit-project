package com.itmo.web.controller;

import com.itmo.web.dto.HitDto;
import com.itmo.web.dto.request.HitRequest;
import com.itmo.web.security.provider.JwtAuthenticationToken;
import com.itmo.web.service.HitService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.ZoneOffset;

import static com.itmo.web.config.SwaggerConfiguration.BEARER_KEY_SECURITY_SCHEME;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/hits")
public class HitController {
    private final HitService hitService;

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/count")
    public ResponseEntity<?> getHitsCount(JwtAuthenticationToken authenticationToken) {
        return ResponseEntity.ok(hitService.hitCount(authenticationToken));
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/pagination")
    public ResponseEntity<?> findHitsWithPagination(JwtAuthenticationToken token, @PageableDefault(page = 0, size = 5, sort = "dateTime", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(hitService.findHitWithPagination(pageable, token));
    }


    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @PostMapping()
    public ResponseEntity<?> saveHit(JwtAuthenticationToken authenticationToken, @Validated @RequestBody HitRequest hitRequest) {
        long time = System.nanoTime();
        HitDto hit = hitService.save(authenticationToken, hitRequest, time, LocalDateTime.now(ZoneOffset.UTC));
        return ResponseEntity.ok(hit);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @DeleteMapping()
    public ResponseEntity<?> deleteAllHits(JwtAuthenticationToken token) {
        return ResponseEntity.ok(hitService.deleteAllHit(token));
    }

}


