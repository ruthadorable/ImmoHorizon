package com.immohorizon.propertymanagement.mapper;

import com.immohorizon.propertymanagement.dto.ArticleDto;
import com.immohorizon.propertymanagement.dto.BannerDto;
import com.immohorizon.propertymanagement.model.Article;
import com.immohorizon.propertymanagement.model.HomePageBanner;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BannerMapper {

    BannerDto toDto(HomePageBanner hpb);

    HomePageBanner toEntity(BannerDto hpbDto);
}
