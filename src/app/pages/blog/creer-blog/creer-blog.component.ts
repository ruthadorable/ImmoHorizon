import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BlogService } from '../../../services/blog/blog.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-creer-blog',
  imports: [TranslateModule,MatButtonModule,MatIconModule,ReactiveFormsModule,MatButtonModule,
    MatIconModule,MatFormFieldModule,MatInputModule,MatSelectModule,ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatAutocompleteModule,
  MatSelectModule,MatCheckboxModule,
  MatDatepickerModule,
MatNativeDateModule,MatCheckboxModule, MatCardModule,MatSelectModule],
  templateUrl: './creer-blog.component.html',
  styleUrl: './creer-blog.component.css'
})
export class CreerBlogComponent {



  fb = inject(FormBuilder);
  blogService = inject(BlogService);

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

categories = [

    'Buying',

    'Selling',

    'Investment',

    'Taxes',

    'Finance',

    'Technology',

    'Marketing',

    'Real Estate',

    'Lifestyle'

];

selectedImage!: File;

imagePreview: string | ArrayBuffer | null = null;

onImageSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (!input.files?.length) return;

    this.selectedImage = input.files[0];

    const reader = new FileReader();

    reader.onload = () => {

        this.imagePreview = reader.result;

    };

    reader.readAsDataURL(this.selectedImage);

}

onSubmit() {

    if (this.articleForm.invalid) {

        return;

    }

    const formData = new FormData();

    formData.append(

        "article",

        new Blob(

            [JSON.stringify(this.articleForm.value)],

            {

                type: "application/json"

            }

        )

    );

    if (this.selectedImage) {

        formData.append("image", this.selectedImage);

    }

    this.blogService.createArticle(formData).subscribe({

        next: () => {

          
            console.log("Article created");

        },

        error: err => {

            console.error(err);

        }

    });

}
  }