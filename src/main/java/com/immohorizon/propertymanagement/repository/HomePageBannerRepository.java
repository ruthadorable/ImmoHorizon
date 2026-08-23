package com.immohorizon.propertymanagement.repository;

import com.immohorizon.propertymanagement.model.HomePageBanner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HomePageBannerRepository extends JpaRepository<HomePageBanner,Long> {



        Optional<HomePageBanner> findFirstByActiveTrueOrderByDisplayOrderAsc();


}
