package com.itmo.web.repository;

import com.itmo.web.entity.RefreshToken;
import org.springframework.data.repository.CrudRepository;


public interface RefreshTokenRepository extends CrudRepository<RefreshToken, Long> {
    boolean deleteByUserId(Long id);
}
