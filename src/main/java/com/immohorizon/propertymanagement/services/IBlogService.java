package com.immohorizon.propertymanagement.services;


import com.immohorizon.propertymanagement.dto.ArticleDto;
import com.immohorizon.propertymanagement.model.Article;

import java.util.List;

public interface IBlogService {
    List<Article> getAllArticles();

    Article getArticle(Long id);

    List<Article> getFeaturedArticles();

    List<Article> getRecentArticles();

    List<Article> getByCategory(String category);

    List<Article> search(String keyword);

    Article createArticle(ArticleDto articleDto);

    Article updateArticle(Long id, Article article);

    void deleteArticle(Long id);
}
