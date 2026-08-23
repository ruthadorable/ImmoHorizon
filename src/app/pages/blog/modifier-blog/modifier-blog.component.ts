import { Component, inject } from '@angular/core';
import { Article } from '../../../models/article.model';
import { BlogService } from '../../../services/blog/blog.service';
import { ActivatedRoute } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {Image} from '../../../models/image.model';
import { DeleteConfirmDialogComponent } from '../../../shared/delete-confirm-dialog/delete-confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-modifier-blog',
  imports: [ReactiveFormsModule, MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatMenuModule,
    MatDividerModule, MatFormFieldModule, MatSelectModule,
    MatSidenavModule,
    MatTooltipModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatChipsModule,
  TranslateModule],
  templateUrl: './modifier-blog.component.html',
  styleUrl: './modifier-blog.component.css'
})
export class ModifierBlogComponent {
  public article!:Article;
  private blogService=inject(BlogService);
  private route=inject(ActivatedRoute);
  private articleId!:number;
  private fb = inject(FormBuilder);
  dialog= inject(MatDialog);
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  imageDeleted = false;
  public categories = [
    'Buying',
    'Selling',
    'Renting',
    'Investment',
    'Taxes',
    'ECONOMY',
    'MARKETING',
    'TECHNOLOGY',
    'Finance',
    'Real Estate',
    'Lifestyle',
    'Charity',
    'Legal Advice'
  ];



articleForm = this.fb.group({

    title: [''],

    slug: [''],

    description: [''],

    content: [''],

    category: [''],

    author: [''],

    link: [''],

    publishedDate: [new Date()],

    readingTime: [5],

    featured: [false]

});

  ngOnInit(){
    this.articleId = Number(
      this.route.snapshot.paramMap.get('id')
    );
     this.blogService.getArticleById(this.articleId).subscribe( (data)=>{
      this.article=data;
      console.log(data);
  })
  }






loadArticle(id: number): void {

    this.blogService.getArticleById(id).subscribe(article => {

        this.article = article;

        this.articleForm.patchValue(article);

    });

}

onImageSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (!input.files?.length) return;

    this.selectedImage = input.files[0];

    this.imageDeleted = false;

    const reader = new FileReader();

    reader.onload = () => {

        this.imagePreview = reader.result;

    };

    reader.readAsDataURL(this.selectedImage);

}

removeImage(): void {

    this.selectedImage = null;

    this.imagePreview = null;

    this.imageDeleted = true;

    if (this.article) {

        this.article.image = '';

    }

}

onSubmit(): void {

    if (this.articleForm.invalid) return;

    const formData = new FormData();

    formData.append(
        'article',
        new Blob(
            [JSON.stringify(this.articleForm.value)],
            { type: 'application/json' }
        )
    );

    if (this.selectedImage) {

        formData.append('image', this.selectedImage);

    }

    formData.append(
        'deleteImage',
        this.imageDeleted.toString()
    );

    this.blogService.updateArticle(
        this.article.idArticle,
        formData
    ).subscribe();

}

deleteArticle(): void {
  const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '400px',
      disableClose: true,
      data: {
        title: 'Delete Property',
        message: 'Are you sure you want to permanently delete this property?'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
  
      if (result) {
  
        this.blogService.deleteArticle(
        this.article.idArticle
    ).subscribe({
  
          next: () => {
  
            console.log('Article deleted');
          },
  
          error: err => console.error(err)
  
        });
  
      }
  
    });




    
   
}
  
  

  

  
 
}
