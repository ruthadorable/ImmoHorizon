import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    MatButtonModule,MatFormFieldModule, MatInputModule, MatSelectModule
   ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ImmoHorizon-frontend';

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'fr', 'nl']);
    this.translate.use('en');
  }

}

