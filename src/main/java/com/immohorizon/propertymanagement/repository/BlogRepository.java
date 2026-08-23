package com.immohorizon.propertymanagement.repository;

import com.immohorizon.propertymanagement.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<Article,Long> {



        List<Article> findByFeaturedTrue();

        List<Article> findByCategoryIgnoreCase(String category);

        List<Article> findTop5ByOrderByPublishedDateDesc();

        List<Article> findByTitleContainingIgnoreCase(String title);


}
