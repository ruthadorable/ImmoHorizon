import { Component ,inject, ViewChild} from '@angular/core';
import { BlogService } from '../../../services/blog/blog.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { TopToolbarComponent } from '../../employee/shared/top-toolbar/top-toolbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteConfirmDialogComponent } from '../../../shared/delete-confirm-dialog/delete-confirm-dialog.component';
import { Article } from '../../../models/article.model';

@Component({
  selector: 'app-gerer-blog',
  imports: [CommonModule,MatCardModule,MatButtonModule,MatToolbarModule,
    MatSidenavModule, MatListModule,MatButtonModule,MatTableModule,MatIcon,
    MatIconModule,MatTooltipModule,TranslateModule,MatPaginatorModule,
    MatDialogModule],
  templateUrl: './gerer-blog.component.html',
  styleUrl: './gerer-blog.component.css'
})
export class GererBlogComponent {

  service=inject(BlogService);
  @ViewChild(MatPaginator)
   paginator!: MatPaginator;

   
   router=inject(Router)
   route=inject(ActivatedRoute)
   articles!:Article[];
   dataSource:any;
   dialog= inject(MatDialog);
  ngOnInit(){
    this.loadArticles();

  }

  loadArticles(){
     this.service.getAllArticles().subscribe((data)=>{
      this.articles=data;
      console.log(this.articles);
       this.dataSource = new MatTableDataSource(this.articles);
       if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    }
    )
  }
  
  displayedColumns = [
    'image',
    'title',
    'category',
    'url',
    'content',
    'actions'
  ];

   getImageUrl(url?: string): string {
     if (!url) {
    return './images/articles/penthouse1.jpg';
  }
  return url;
  }

  createBlog() {
    this.router.navigate(['creer-blog'],{
    relativeTo: this.route
    }
    );
  }

  viewBlog(id: number) {
    this.router.navigate(['blog',id],{
    relativeTo: this.route
  })
  }

  editBlog(id: number) {
     this.router.navigate(['modifier-blog',id],{
    relativeTo: this.route
  });
  }


 deleteBlog(id: number): void {

  const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
    width: '400px',
    disableClose: true,
    data: {
      title: 'Delete Property',
      message: 'Are you sure you want to permanently delete this article?'
    }
  });

  dialogRef.afterClosed().subscribe(result => {

    if (result) {

      this.service.deleteArticle(id).subscribe({

        next: () => {

          this.loadArticles();
          console.log(`Article with ID ${id} deleted successfully.`);

        },

        error: (err) => console.error(err)

      });

    }

  });

}


}
