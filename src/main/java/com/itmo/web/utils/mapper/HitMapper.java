package com.itmo.web.utils.mapper;

import com.itmo.web.dto.HitDto;
import com.itmo.web.entity.Hit;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(uses = {UserMapper.class})
public interface HitMapper {
    HitMapper INSTANCE = Mappers.getMapper(HitMapper.class);

    Hit toEntity(HitDto hitDto);

    HitDto toDto(Hit hit);
}
