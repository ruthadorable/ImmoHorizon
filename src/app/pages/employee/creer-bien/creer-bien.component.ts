import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder,FormControl, ReactiveFormsModule } from '@angular/forms';
import { BienService } from '../../../services/biens/bien.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { map, Observable, startWith } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { belgianCities } from '../../../enum/belgianCities.model';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { typesDeBien } from '../../../enum/typeBiens.enum';
import { etats } from '../../../enum/etats.enum';
import { pebs } from '../../../enum/pebs.enum';
import { TypeChauffage } from '../../../enum/typeDeChauffage.enum';
import {MatNativeDateModule} from '@angular/material/core';
import { Image } from '../../../models/image.model';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-creer-bien',
  imports: [TranslateModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    DragDropModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatAutocompleteModule,AsyncPipe,
  MatSelectModule,MatCheckboxModule,
  MatDatepickerModule,
MatNativeDateModule],
  templateUrl: './creer-bien.component.html',
  styleUrl: './creer-bien.component.css'
})
export class CreerBienComponent implements OnInit{

  private fb = inject(FormBuilder);
  router= inject(Router);
  route=inject(ActivatedRoute);
  readonly pebs = Object.values(pebs);
  readonly typeChauffage= Object.values(TypeChauffage);
  belgianCities=belgianCities;
  readonly etats=Object.values(etats);
  selectedFiles: Image[] = [];
  images: Image[] = [];
  readonly typesDeBien = Object.values(typesDeBien);
  filteredCities!:Observable<any[]>;
  cityControl = new FormControl('');

  constructor(private bienService: BienService) { }

  form = this.fb.group({
  title: [''],
  type: [''],
  typeDeBien: [''],
  description: [''],
  prix: [0],
  superficie: [0],
  chambres: [0],
  peb: [''],
  energieTotale: [0],
  energieSpecifique: [0],
  emissionCO2: [0],
  rue: [''],
  numero: [0],
  code_postal: [0],
  commune: [''],
  facades: [0],
  annee_construction: [null],
  type_chauffage:[null],
  disponibilite: [null],
  etat: [''],
  etages: [0],
  parking: [false],
  garage: [false],
  jardin: [false],
  terrasse: [false],
  cave: [false],
  disponible: [true],
  surfaceHabitable: [0],
  surfaceJardinTerrasse: [0],
  images: [null]
});

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
selectedCity(city: any) {
  this.form.patchValue({
    commune: city.commune,
    code_postal: city.postalCode
  });
}

onFilesSelected(event: Event): void {
  const input = event.target as HTMLInputElement;

  if (!input.files) {
    return;
  }

  Array.from(input.files).forEach(file => {
    this.addImage(file);
  });

  input.value = '';
}

onFileChange(event: Event): void {
  this.onFilesSelected(event);
}

onFileSelected(event: Event): void {
  this.onFilesSelected(event);
}

setPrimary(index: number): void {
  this.images.forEach((img, i) => {
    img.primary = i === index;
  });
}

removeImage(index: number): void {
  this.images.splice(index, 1);

  // Keep a primary image when images remain
  if (
    this.images.length > 0 &&
    !this.images.some(img => img.primary)
  ) {
    this.images[0].primary = true;
  }

  this.selectedFiles = [...this.images];
}

onDrop(event: any): void {
  const files: File[] =
    Array.from(event.dataTransfer?.files ?? []);

  files.forEach(file => this.addImage(file));
}

addImage(file: File): void {
  const reader = new FileReader();

  reader.onload = () => {
    const image = new Image(
      this.images.length === 0,
      '', // S3 imageKey assigned after upload
      reader.result as string
    );

    image.file = file;

    this.images.push(image);
    this.selectedFiles = [...this.images];
  };

  reader.readAsDataURL(file);
}

submit(): void {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  const property = {
    title: this.form.value.title,
    description: this.form.value.description,
    prix: this.form.value.prix,
    commune: this.form.value.commune
  };

  // Extract actual files for the upload
  const files: File[] = this.images
    .map(img => img.file)
    .filter((file): file is File => file !== undefined);

  console.log('Property:', property);
  console.log('Images:', this.images);
  console.log('Files to upload:', files);

  this.bienService.creerBien(property, files).subscribe({
    next: res => {
      console.log('Property created successfully:', res);
      this.router.navigate(['/properties'],{
    relativeTo: this.route
  })
    },
    error: err => {
      console.error('Property creation failed:', err);
      console.log('Status:', err.status);
      console.log('Response:', err.error);
      console.log('Message:', err.message);
    }
  });
}
}
