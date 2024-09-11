package com.itmo.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PageController {
    @RequestMapping({"/", "/login", "/register"})
    public String test() {
        return "index.html";
    }


}
