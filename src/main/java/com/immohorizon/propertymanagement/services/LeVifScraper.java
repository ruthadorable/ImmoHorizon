package com.immohorizon.propertymanagement.services;

import com.immohorizon.propertymanagement.dto.ArticleDto;
import com.immohorizon.propertymanagement.mapper.BlogMapper;
import com.immohorizon.propertymanagement.model.Article;
import com.immohorizon.propertymanagement.repository.BlogRepository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Attribute;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class LeVifScraper {

    @Autowired
    BlogMapper mapper;
    @Autowired
    BlogRepository blogRepository;

    public List<ArticleDto> scrape() throws IOException {

        List<ArticleDto> articles = new ArrayList<>();

        Document document = Jsoup.connect(
                        "https://www.levif.be/economie/immo/"
                )
                .userAgent("Mozilla/5.0")
                .get();

        Elements elements = document.select("article");

        for(Element element : elements){

           String title = element.getElementsByClass("c-teaser-block__title-inner").text();

            String link = element.getElementsByClass("c-teaser-block__visual-link").attr("href");

            String image = element.getElementsByClass("c-picture__image").attr("data-lazy-src");

            String description = element.getElementsByClass("c-teaser-block__text").text();

            String content= element.getElementsByClass("c-teaser-block__text").text();

            String category=element.getElementsByClass("c-stamp__text").text();

            ArticleDto dto=new ArticleDto( title,link,image,description,content);
            dto.setCategory(category);
            articles.add( dto);
            Article article= mapper.toEntity(dto);
            blogRepository.save(article);
        }

        return articles;

    }

}