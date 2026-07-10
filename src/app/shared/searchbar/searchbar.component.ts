import {
  Component,
  EventEmitter,
  Output,
  inject
} from '@angular/core';

import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule
} from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { typesDeBien } from '../../models/typeBiens.model';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { belgianCities } from '../../models/belgianCities.model';
import { pebs } from '../../models/pebs.model';
import { CriteresRecherche } from '../../models/criteresRecherche.model';
import { NonNullableFormBuilder } from '@angular/forms';
@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatExpansionModule, MatMenuModule,
    MatDividerModule, MatFormFieldModule, MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatInputModule,
    MatChipsModule,
    TranslateModule,
    MatAutocompleteModule,
    AsyncPipe

  ],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchBarComponent {

  @Output()
  search = new EventEmitter<CriteresRecherche>();
  typesBien=typesDeBien;
  belgianCities=belgianCities;
  pebs=pebs;
  private fb = inject(FormBuilder);

  cityControl = new FormControl('');

  filteredCities!: Observable<any[]>;

  constructor(private translate: TranslateService
  ) {}
  ngOnInit() {

    this.filteredCities = this.cityControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterCities(value || ''))
    );

  }


  private filterCities(value: string) {

    const search = value.toLowerCase();

    return this.belgianCities.filter(city =>
      city.commune.toLowerCase().startsWith(search)
    );

  }

  advanced = false;

  advancedForm = this.fb.group({
    commune: [''],
  type: [''],
  typeDeBien: [''],
  minSuperficie: [null] ,
  maxSuperficie: [null] ,  
  minPrix: [null],
  maxPrix: [null],
  chambres: [null],
  salleDeBain: [null],
  jardin: [null],
  garage: [null],
  parking: [null],
  terrasse: [null],
  meuble: [null],
  cave: [null],
  ascenseur: [null],
  peb: [null]
  });
  toggleAdvanced() {
    this.advanced = !this.advanced;
    console.log('Advanced search toggled:', this.advanced);
  }
  onSearch(){

    Object.entries(this.advancedForm.getRawValue())
    .map(([key, value]) => [
      key,
      value === '' ? null : value
    ])

    const formValue = this.advancedForm.getRawValue();


  // const criteria: CriteresRecherche = {
  //   commune: formValue.commune ?? '',
  //   minPrix: formValue.minPrix ?? 0,
  //   maxPrix: formValue.maxPrix ?? 0,
  //   type: formValue.type ?? '',
  //   typeDeBien: formValue.typeDeBien ?? '',
  //   peb: formValue.peb ?? '',
  //   chambres: formValue.chambres ?? 0,
  //   salleDeBain: formValue.salleDeBain ?? 0,
  //   minSuperficie: formValue.minSuperficie ?? 0,
  //   maxSuperficie: formValue.maxSuperficie ?? 100000,  
  //   jardin: formValue.jardin ?? false,
  //   terrasse:formValue.terrasse ??false,
  //   garage:formValue.garage ?? false,
  //   parking:formValue.parking ?? false,
  //   cave:formValue.cave ?? false,
  //   ascenseur:formValue.ascenseur ?? false,
  //   meuble:formValue.meuble ?? false
  // };

  console.log(formValue);
  this.search.emit(formValue);
  }
  
  reset() {
    this.advancedForm.reset();
  }
}