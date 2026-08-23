package com.immohorizon.propertymanagement.controller;

import com.immohorizon.propertymanagement.dto.BannerDto;
import com.immohorizon.propertymanagement.services.HomePageBannerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/homepage/banner")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class HomePageBannerController {

    private final HomePageBannerService homepageBannerService;

    @GetMapping
    public BannerDto getBanner() {
        return homepageBannerService.getActiveBanner();
    }
    @GetMapping("/{id}")
    public BannerDto getBanner(@PathVariable Long id){
        return homepageBannerService.getBanner(id);
    }

    @GetMapping("/all")
    public List<BannerDto> getAllBanners(){
        return homepageBannerService.getAllBanners();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public BannerDto createBanner(
            @RequestPart("banner") BannerDto banner,
            @RequestPart(value = "image", required = false) MultipartFile image)
            throws IOException {

        return homepageBannerService.createBanner(banner, image);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public BannerDto updateBanner(
            @PathVariable Long id,
            @RequestPart("banner") BannerDto banner,
            @RequestPart(value = "image", required = false) MultipartFile image)
            throws IOException {

        return homepageBannerService.updateBanner(id, banner, image);
    }

    @DeleteMapping("/{id}")
    public void deleteBanner(@PathVariable Long id) {
        homepageBannerService.deleteBanner(id);
    }

}