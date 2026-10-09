import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-footer',
  imports: [TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  private router=inject(Router);

  constructor(private translate: TranslateService, private route:Router) { }
  
    setLanguage(lang: string) {
      this.translate.use(lang)
    }

    navTo(url:string){
      this.router.navigate([url]);
    }

}
