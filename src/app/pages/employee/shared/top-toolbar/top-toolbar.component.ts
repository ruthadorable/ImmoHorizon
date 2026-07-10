import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCalendar } from '@angular/material/datepicker';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-top-toolbar',
  imports: [MatCardModule,MatButtonModule,MatToolbarModule,
    MatSidenavModule, MatListModule
  ],
  templateUrl: './top-toolbar.component.html',
  styleUrl: './top-toolbar.component.css'
})
export class TopToolbarComponent {
   public getUsername(): string {
    const username = localStorage.getItem('username')+" "+localStorage.getItem('prenom')  ;
    return username ? username : '';
  }


}
