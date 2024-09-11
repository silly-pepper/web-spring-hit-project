package com.itmo.web.service;


import org.springframework.stereotype.Component;

@Component
public class HitChecker {
    public boolean check(double x, double y, double r){
        return checkHitInCircle(x,y,r) || checkHitInTriangle(x,y,r) || checkHitInRectangle(x,y,r);
    }

    private boolean checkHitInTriangle(double x, double y, double r){
        return x >= 0 && y <= 0 && y>=-r+2*x;
    }

    private boolean checkHitInRectangle (double x, double y, double r){
        return x <= 0 && y >= 0 && x >= -r  && y <= r/2;
    }

    private boolean checkHitInCircle(double x, double y, double r){
        return x <= 0 && y <= 0 && y>=-Math.sqrt((r*r)/4-x*x);
    }
}
