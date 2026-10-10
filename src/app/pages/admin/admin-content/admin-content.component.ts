import { Component } from '@angular/core';
import { BienService } from '../../../services/biens/bien.service';
import { BlogService } from '../../../services/blog/blog.service';
import { HomepageService } from '../../../services/homepage/homepage.service';
import { UserService } from '../../../services/user/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';

@Component({
  selector: 'app-admin-content',
  imports: [RouterLink, TranslateModule, MatButtonModule, MatIconModule, MatButtonModule,
    MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule,
    MatButtonModule, MatCardModule, MatIconModule, MatAutocompleteModule, MatSelectModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, AdminPanelComponent, AdminContentComponent],
  templateUrl: './admin-content.component.html',
  styleUrl: './admin-content.component.css'
})
export class AdminContentComponent {
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
