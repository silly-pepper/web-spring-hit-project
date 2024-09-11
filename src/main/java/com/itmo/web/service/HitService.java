package com.itmo.web.service;

import com.itmo.web.dto.HitDto;
import com.itmo.web.dto.request.HitRequest;
import com.itmo.web.entity.Hit;
import com.itmo.web.entity.User;
import com.itmo.web.repository.HitRepository;
import com.itmo.web.repository.UserRepository;
import com.itmo.web.security.provider.JwtAuthenticationToken;
import com.itmo.web.security.userDetails.CustomUserDetails;
import com.itmo.web.service.exceptions.HitNotFoundException;
import com.itmo.web.utils.mapper.HitMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HitService {
    private final HitRepository hitRepository;
    private final UserRepository userRepository;
    private final HitChecker hitChecker;

    public Long hitCount(JwtAuthenticationToken authenticationToken) {
        CustomUserDetails details = authenticationToken.getDetails();
        return hitRepository.countByUserId(details.getId());
    }

    public List<HitDto> findHitWithPagination(Pageable pageable, JwtAuthenticationToken authenticationToken) {
        CustomUserDetails details = authenticationToken.getDetails();
        long id = details.getId();
        List<Hit> allByUserId = hitRepository.findAllByUserId(id, pageable);
        return allByUserId.stream().map(HitMapper.INSTANCE::toDto).collect(Collectors.toList());
    }


    public HitDto save(JwtAuthenticationToken authenticationToken, HitRequest hitRequest,  long executionTime, LocalDateTime time) {
        CustomUserDetails details = authenticationToken.getDetails();
        Optional<User> byId = userRepository.findById(details.getId());
        boolean result = hitChecker.check(hitRequest.getX(),
                hitRequest.getY(),
                hitRequest.getR());
        HitDto hitDto = new HitDto(hitRequest.getX(),
                hitRequest.getY(),
                hitRequest.getR(),
                result,
                executionTime,
                time);
        Hit hit = HitMapper.INSTANCE.toEntity(hitDto);
        hit.setUser(byId.get());
        hit = hitRepository.save(hit);
        return HitMapper.INSTANCE.toDto(hit);
    }

    @Transactional
    public Long deleteAllHit(JwtAuthenticationToken token) {
        CustomUserDetails details = token.getDetails();
        return hitRepository.deleteAllByUserId(details.getId());
    }

    public HitDto findById(long hitId) {
        Optional<Hit> hitDto = hitRepository.findById(hitId);
        if (hitDto.isPresent()){
            Hit hit = hitDto.get();
            return HitMapper.INSTANCE.toDto(hit);
        }
        throw new HitNotFoundException("hit not found");
    }

    public List<HitDto> findAllByUserId(Long userId){
        List<Hit> allByUserId = hitRepository.findAllByUserId(userId);
        return allByUserId.stream().map(HitMapper.INSTANCE::toDto).collect(Collectors.toList());
    }
}
