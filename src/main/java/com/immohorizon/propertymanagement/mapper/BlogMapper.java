package com.immohorizon.propertymanagement.mapper;

import com.immohorizon.propertymanagement.dto.ArticleDto;
import com.immohorizon.propertymanagement.model.Article;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BlogMapper {

    ArticleDto toDto(Article article);

    Article toEntity(ArticleDto articleDto);
}
