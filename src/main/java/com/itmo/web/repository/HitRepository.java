package com.itmo.web.repository;

import com.itmo.web.entity.Hit;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HitRepository extends JpaRepository<Hit, Long> {
    List<Hit> findAllByUserId(Long id);
    Long countByUserId(Long id);
    List<Hit> findAllByUserId(Long id, Pageable pageable);
    Long deleteAllByUserId(Long id);
}
