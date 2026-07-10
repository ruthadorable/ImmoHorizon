import { Component ,inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.css'
})
export class LanguageSelectorComponent {
  public languages=[
    { code: 'FR', name: 'French' },
    { code: 'NL', name: 'Dutch' }
  ];
  selectedLanguage = 'EN';
  isOpen = false;
  public count=0;
  public item!:any;

  translate=inject(TranslateService)
  public allLanguages = [
    { code: 'EN', name: 'English' },
    { code: 'FR', name: 'French' },
    { code: 'NL', name: 'Dutch' }
  ];
  constructor(){
    this.translate.addLangs(['en', 'fr', 'nl']);
    this.translate.use('en');
    this.allLanguages = [
    { code: 'EN', name: 'English' },
    { code: 'FR', name: 'French' },
    { code: 'NL', name: 'Dutch' }
  ];
  }

  

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectLanguage(lang: string) {
  const previousLanguage = this.selectedLanguage;

  // Change selected language
  this.selectedLanguage = lang;

  // Close dropdown
  this.isOpen = false;

  // Change application language
  this.translate.use(lang.toLowerCase());

  // Remove selected language from dropdown
  this.languages = this.allLanguages.filter(
    (l) => l.code !== this.selectedLanguage
  );
}
}