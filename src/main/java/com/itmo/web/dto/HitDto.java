package com.itmo.web.dto;


import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class HitDto {
    private long id;
    private double x;
    private double y;
    private double r;
    private boolean result;
    private long executionTime;
    private LocalDateTime dateTime;

    public HitDto(double xValue, double yValue, double rValue) {
        this.x = xValue;
        this.y = yValue;
        this.r = rValue;
    }

    public HitDto(double xValue, double yValue, double rValue, boolean result, long executionTime, LocalDateTime dateTime) {
        this.x = xValue;
        this.y = yValue;
        this.r = rValue;
        this.result = result;
        this.executionTime = executionTime;
        this.dateTime = dateTime;
    }
}
