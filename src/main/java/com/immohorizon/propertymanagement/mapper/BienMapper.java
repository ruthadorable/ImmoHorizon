package com.immohorizon.propertymanagement.mapper;

import com.immohorizon.propertymanagement.dto.ArticleDto;
import com.immohorizon.propertymanagement.dto.BienDto;
import com.immohorizon.propertymanagement.model.Article;
import com.immohorizon.propertymanagement.model.Bien;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BienMapper {
    BienDto toDto(Bien bien);

    Bien toEntity(BienDto bienDto);
}
