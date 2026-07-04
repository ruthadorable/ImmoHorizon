import {
  Component,
  EventEmitter,
  Output,
  inject
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule
} from '@angular/forms';

import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatExpansionModule,
    TranslateModule
  ],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchBarComponent {

  @Output()
  search = new EventEmitter();
  private fb = inject(FormBuilder);
  public simpleSearchForm = this.fb.group({
    commune: ['']
  });
  constructor(private translate: TranslateService
  ) {}

  advanced = false;

  advancedForm = this.fb.group({
    commune: [''],
    minPrix: [],
    maxPrix: [],
    typeDeBien: [''],
    chambres: [],
    salleDeBain: [],
    minSuperficie: [],
    maxSuperficie: [],  
    jardin: [false],
    terasse:[false],
    garage: [false],
    meuble: [false]
  });
  propertyTypes = [
  'APPARTEMENT',
  'MAISON',
  'STUDIO',
  'DUPLEX',
  'LOFT',
  'VILLA',
  'TERRAIN',
  'BUREAU',
  'COMMERCE',
  'ENTREPOT',
  'PARKING',
  'LOCAL_COMMERCIAL',
  'IMMEUBLE',
  'AUTRE'
];

  toggleAdvanced() {
    this.advanced = !this.advanced;
    console.log('Advanced search toggled:', this.advanced);
  }
  submitSimpleForm(){
    console.log(this.simpleSearchForm.value);
    this.search.emit(this.simpleSearchForm.value);
  }
  submit2() {
    console.log(this.advancedForm.value);
    this.search.emit(this.advancedForm.value);
  }


  reset() {
    this.advancedForm.reset({
      jardin: false,
      terasse: false,
      garage: false,
      meuble: false
    });
  }
}