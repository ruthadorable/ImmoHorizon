import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { BlogService } from '../../../services/blog/blog.service';
import { HomepageService } from '../../../services/homepage/homepage.service';
import { BienService } from '../../../services/biens/bien.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterLink,TranslateModule,MatButtonModule,MatIconModule,MatButtonModule,
    MatIconModule,MatFormFieldModule,MatInputModule,MatSelectModule,ReactiveFormsModule,
    MatButtonModule,MatCardModule,MatIconModule,MatAutocompleteModule,MatSelectModule,MatCheckboxModule,MatDatepickerModule,MatNativeDateModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
 

    usersCount = 0;

    bannersCount = 0;

    articlesCount = 0;

    propertiesCount = 0;

    constructor(
        private userService: UserService,
        private articleService: BlogService,
        private propertyService: BienService,
        private bannerService: HomepageService
    ) {}

    ngOnInit(): void {

        this.loadStatistics();

    }

    loadStatistics(): void {

        this.userService.getUsers().subscribe(users => {
            this.usersCount = users.length;
        });

        this.articleService.getAllArticles().subscribe(articles => {
            this.articlesCount = articles.length;
        });

        this.propertyService.getAllProperties().subscribe(properties => {
            this.propertiesCount = properties.length;
        });

        this.bannerService.getAllBanners().subscribe(banners => {
            this.bannersCount = banners.length;
        });

    }

}

