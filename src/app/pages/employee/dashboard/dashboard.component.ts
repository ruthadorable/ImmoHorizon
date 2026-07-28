import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCalendar } from '@angular/material/datepicker';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { SidenavComponent } from '../shared/sidenav/sidenav.component';
import { TopToolbarComponent } from '../shared/top-toolbar/top-toolbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { RouterOutlet } from '@angular/router';
import {MatBadgeModule} from '@angular/material/badge'

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule,MatIcon,MatButtonModule,MatToolbarModule,RouterOutlet,
    MatSidenavModule, MatListModule,SidenavComponent,MatMenuModule,MatBadgeModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

badgevisible = false;
  badgevisibility() {
    this.badgevisible = true;
  }
   public getUsername(): string {
    const username = localStorage.getItem('username')+" "+localStorage.getItem('prenom')  ;
    return username ? username : '';
  }
  

}
