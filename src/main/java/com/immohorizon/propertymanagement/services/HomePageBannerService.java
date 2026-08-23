package com.immohorizon.propertymanagement.services;

import com.immohorizon.propertymanagement.dto.BannerDto;
import com.immohorizon.propertymanagement.mapper.BannerMapper;
import com.immohorizon.propertymanagement.model.HomePageBanner;
import com.immohorizon.propertymanagement.repository.HomePageBannerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class HomePageBannerService {

    @Autowired
    private final HomePageBannerRepository homepageBannerRepository;
    @Autowired
    private final S3Service s3StorageService;
    @Autowired
    private BannerMapper mapper;


    public BannerDto createBanner(
            BannerDto dto,
            MultipartFile image) throws IOException {

        HomePageBanner banner = new HomePageBanner();

        banner = mapper.toEntity(dto);

        if (image != null && !image.isEmpty()) {

            String imageUrl = s3StorageService.uploadFile(image);

            banner.setImage(imageUrl);

        }

        HomePageBanner saved =
                homepageBannerRepository.save(banner);

        return mapper.toDto(saved);

    }

    public BannerDto updateBanner(
            Long id,
            BannerDto dto,
            MultipartFile image) throws IOException {

        HomePageBanner banner =
                homepageBannerRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Banner not found"));

        banner= mapper.toEntity(dto);

        if (image != null && !image.isEmpty()) {

            if (banner.getImage() != null) {

                s3StorageService.deleteFile(banner.getImage());

            }

            String imageUrl =
                    s3StorageService.uploadFile(image);

            banner.setImage(imageUrl);

        }

        HomePageBanner updated =
                homepageBannerRepository.save(banner);

        return mapper.toDto(updated);

    }

    @Transactional(readOnly = true)
    public BannerDto getBanner(Long id) {
        HomePageBanner banner =
                homepageBannerRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Banner not found"));
        return mapper.toDto(banner);
    }

    @Transactional(readOnly = true)
    public BannerDto getActiveBanner() {

        HomePageBanner banner =
                homepageBannerRepository
                        .findFirstByActiveTrueOrderByDisplayOrderAsc()
                        .orElseThrow(() ->
                                new RuntimeException("No active banner"));

        return mapper.toDto(banner);

    }

    @Transactional(readOnly = true)
    public List<BannerDto> getAllBanners() {

        return homepageBannerRepository.findAll()
                .stream()
                .map(mapper::toDto)
                .toList();

    }

    public void deleteBanner(Long id) {

        HomePageBanner banner =
                homepageBannerRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Banner not found"));

        if (banner.getImage() != null) {

            s3StorageService.deleteFile(banner.getImage());

        }

        homepageBannerRepository.delete(banner);

    }

}
