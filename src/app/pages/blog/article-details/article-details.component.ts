import { Component, inject } from '@angular/core';
import { BlogService } from '../../../services/blog/blog.service';
import { Article } from '../../../models/article.model';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Image } from '../../../models/image.model';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-article-details',
  imports: [TranslateModule,MatIconModule,MatButtonModule,MatIconModule,BreadcrumbComponent],
  templateUrl:'./article-details.component.html',
  styleUrl: './article-details.component.css'
})
export class ArticleDetailsComponent {
  public article!:Article;
  private blogService=inject(BlogService);
  private route=inject(ActivatedRoute);
  private articleId!:number;
  
  


  ngOnInit(){
    this.articleId = Number(
      this.route.snapshot.paramMap.get('id')
    );

     this.blogService.getArticleById(this.articleId).subscribe( (data)=>{
      this.article=data;
      console.log(data);

  })
  }
  navBack(){
    window.history.back();
  }

  getImageUrl(url?: string): string {
     if (url == undefined) {
    return './images/properties/penthouse1.jpg';
  }
  return url;
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
}
