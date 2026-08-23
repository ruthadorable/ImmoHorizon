package com.immohorizon.propertymanagement.services.impl;

import com.immohorizon.propertymanagement.dto.ArticleDto;
import com.immohorizon.propertymanagement.mapper.BlogMapper;
import com.immohorizon.propertymanagement.model.Article;
import com.immohorizon.propertymanagement.repository.BlogRepository;
import com.immohorizon.propertymanagement.services.IBlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BlogService implements IBlogService {
    @Autowired
    private BlogMapper mapper;
    @Autowired
    private BlogRepository repository;

    @Override
    public List<Article> getAllArticles() {
        return repository.findAll(
                Sort.by(Sort.Direction.DESC,"publishedDate"));
    }

    @Override
    public Article getArticle(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Article not found"));
    }

    @Override
    public List<Article> getFeaturedArticles() {
        return repository.findByFeaturedTrue();
    }

    @Override
    public List<Article> getRecentArticles() {
        return repository.findTop5ByOrderByPublishedDateDesc();
    }

    @Override
    public List<Article> getByCategory(String category) {

        return repository.findByCategoryIgnoreCase(category);
    }

    @Override
    public List<Article> search(String keyword) {

        return repository
                .findByTitleContainingIgnoreCase(
                        keyword
                );
    }

    @Override
    public Article createArticle(ArticleDto articleDto) {

        articleDto.setPublishedDate(LocalDate.now());

        Article article= mapper.toEntity(articleDto);


        return repository.save(article);
    }

    @Override
    public Article updateArticle(Long id, Article article) {

        Article existing = getArticle(id);

        existing.setTitle(article.getTitle());
        existing.setSlug(article.getSlug());
        existing.setDescription(article.getDescription());
        existing.setContent(article.getContent());
        existing.setImage(article.getImage());
        existing.setCategory(article.getCategory());
        existing.setFeatured(article.isFeatured());
        existing.setAuthor(article.getAuthor());
        existing.setReadingTime(article.getReadingTime());

        return repository.save(existing);
    }

    @Override
    public void deleteArticle(Long id) {

        repository.deleteById(id);

    }
}
