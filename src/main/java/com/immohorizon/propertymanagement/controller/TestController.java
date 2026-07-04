package com.immohorizon.propertymanagement.controller;

import com.immohorizon.propertymanagement.services.BienService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {

    private final BienService bienService;

    public TestController(BienService bienService) {
        this.bienService = bienService;
    }

    @PostMapping("/generate")
    public String generate() {
        bienService.generateDummyBien(100);
        return "100 biens generated";
    }
}