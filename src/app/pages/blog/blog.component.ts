import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Article } from '../../models/article.model';
import { BlogService } from '../../services/blog/blog.service';
import { SearchPipe } from '../../pipes/search.pipe';



@Component({
  selector: 'app-blog',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    SearchPipe
  ],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  private blogService = inject(BlogService);

  searchText="";

  articles: Article[] = [];

  featuredArticles: Article[] = [];

  recentArticles: Article[] = [];

  searchTerm = '';

  selectedCategory = 'All';

  categories = [
    'All',
    'Buying',
    'Selling',
    'Renting',
    'Investment',
    'Taxes'
  ];
  filteredArticles: Article[] = [];



    filterArticles() {

      const search = this.searchText.toLowerCase();

      this.filteredArticles = this.articles.filter(article =>
          article.content.toLowerCase().includes(search) ||
          article.description.toLowerCase().includes(search)
      );
      }

  ngOnInit(): void {

    this.loadArticles();

    this.loadFeaturedArticles();

    this.loadRecentArticles();

  }

  loadArticles(): void {

    this.blogService.getAllArticles().subscribe({

      next: (articles) => {

        this.articles = articles;
        this.filteredArticles = articles;
        console.log(this.articles);

      },

      error: err => console.error(err)

    });

  }

  loadFeaturedArticles(): void {

    this.blogService.getRecentArticles().subscribe({

      next: data => {

        this.featuredArticles = data;

      },

      error: err => console.error(err)

    });

  }

  loadRecentArticles(): void {

    this.blogService.getRecentArticles().subscribe({

      next: data => {

        this.recentArticles = data;

      },

      error: err => console.error(err)

    });

  }
  goTo(url: string) {
    
    if (!url) {
      console.error('URL is empty');
      return;
    }

    const newWindow = window.open(url, '_blank');

    if (newWindow) {
      newWindow.opener = null;
    }
  }
  search(): void {

    if (this.searchTerm.trim() === '') {

      this.loadArticles();

      return;

    }

    this.blogService.search(this.searchTerm).subscribe({

      next: data => {

        this.articles = data;

      }

    });

  }

  filter(category: string): void {

    this.selectedCategory = category;

    if (category === 'All') {

      this.loadArticles();

      return;

    }

    this.blogService.getByCategory(category).subscribe({

      next: data => {

        this.articles = data;

      }

    });

  }

}