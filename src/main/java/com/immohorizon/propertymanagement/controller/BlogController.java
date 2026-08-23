package com.immohorizon.propertymanagement.controller;


import com.immohorizon.propertymanagement.dto.ArticleDto;
import com.immohorizon.propertymanagement.model.Article;
import com.immohorizon.propertymanagement.services.LeVifScraper;
import com.immohorizon.propertymanagement.services.impl.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blog")
@CrossOrigin(origins = "http://localhost:4200")
public class BlogController {
    @Autowired
    private BlogService service;
    @Autowired
    private LeVifScraper serviceScraper;

    @GetMapping("/all")
    public ResponseEntity<List<Article>> getAllArticles() throws Exception{
        serviceScraper.scrape();

        return ResponseEntity.ok(service.getAllArticles());

    }

    @GetMapping("/{id}")
    public ResponseEntity<Article> getArticle(
            @PathVariable Long id){

        return ResponseEntity.ok(
                service.getArticle(id));

    }

    @GetMapping("/featured")
    public ResponseEntity<List<Article>> featured(){

        return ResponseEntity.ok(
                service.getFeaturedArticles());

    }

    @GetMapping("/recent")
    public ResponseEntity<List<Article>> recent(){

        return ResponseEntity.ok(
                service.getRecentArticles());

    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Article>> category(
            @PathVariable String category){

        return ResponseEntity.ok(
                service.getByCategory(category));

    }

    @GetMapping("/search")
    public ResponseEntity<List<Article>> search(
            @RequestParam String keyword){

        return ResponseEntity.ok(
                service.search(keyword));

    }

    @PostMapping
    public ResponseEntity<Article> create(
            @RequestBody ArticleDto articleDto){

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.createArticle(articleDto));

    }

    @PutMapping("/{id}")
    public ResponseEntity<Article> update(
            @PathVariable Long id,
            @RequestBody Article article){

        return ResponseEntity.ok(
                service.updateArticle(id,article));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id){

        service.deleteArticle(id);

        return ResponseEntity.noContent().build();

    }


}
