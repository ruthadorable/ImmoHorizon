import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login/login.service';
import { RegisterService } from '../../services/auth/register/register.service';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';


interface ImagePreview {
  file: File;
  url: string;
  primary: boolean;
}

@Component({
  selector: 'app-publier-annonce',
  imports: [ CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule],
  templateUrl: './publier-annonce.component.html',
  styleUrl: './publier-annonce.component.css'
})
export class PublierAnnonceComponent {
    // ==========================================================
  // FORMULAIRE
  // ==========================================================

  propertyForm: FormGroup;

  submitting = false;


  // ==========================================================
  // IMAGES
  // ==========================================================

  imagePreviews: ImagePreview[] = [];


  // ==========================================================
  // TYPES DE BIENS
  // ==========================================================

  propertyTypes: string[] = [
    'Appartement',
    'Maison',
    'Studio',
    'Duplex',
    'Loft',
    'Villa',
    'Terrain',
    'Bureau',
    'Commerce',
    'Entrepôt',
    'Parking',
    'Local commercial',
    'Immeuble',
    'Autre'
  ];


  // ==========================================================
  // CONSTRUCTEUR
  // ==========================================================

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {

    this.propertyForm = this.fb.group({

      // ------------------------------------------------------
      // INFORMATIONS GÉNÉRALES
      // ------------------------------------------------------

      title: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(150)
        ]
      ],

      typeDeBien: [
        '',
        Validators.required
      ],

      transactionType: [
        'VENTE',
        Validators.required
      ],

      description: [
        '',
        [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(2000)
        ]
      ],


      // ------------------------------------------------------
      // PRIX
      // ------------------------------------------------------

      prix: [
        null,
        [
          Validators.required,
          Validators.min(0)
        ]
      ],

      charges: [
        null,
        Validators.min(0)
      ],


      // ------------------------------------------------------
      // CARACTÉRISTIQUES
      // ------------------------------------------------------

      superficie: [
        null,
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      chambres: [
        0,
        Validators.min(0)
      ],

      salleDeBain: [
        0,
        Validators.min(0)
      ],

      etage: [
        0
      ],

      anneeConstruction: [
        null,
        Validators.min(1800)
      ],


      // ------------------------------------------------------
      // ÉQUIPEMENTS
      // ------------------------------------------------------

      garage: [false],

      parking: [false],

      jardin: [false],

      terrasse: [false],

      balcon: [false],

      cave: [false],

      ascenseur: [false],

      meuble: [false],


      // ------------------------------------------------------
      // LOCALISATION
      // ------------------------------------------------------

      rue: [''],

      numero: [''],

      codePostal: [''],

      commune: [
        '',
        Validators.required
      ],

      pays: [
        'Belgique',
        Validators.required
      ],


      // ------------------------------------------------------
      // PEB
      // ------------------------------------------------------

      peb: [''],

      consommationEnergetique: [
        null,
        Validators.min(0)
      ],

      emissionCo2: [
        null,
        Validators.min(0)
      ],


      // ------------------------------------------------------
      // DISPONIBILITÉ
      // ------------------------------------------------------

      etat: [
        'Disponible',
        Validators.required
      ],

      disponibilite: [
        null
      ]

    });
  }


  // ==========================================================
  // SÉLECTION DES IMAGES
  // ==========================================================

  onFilesSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const files = Array.from(input.files);

    files.forEach(file => {

      // Vérifier le type
      if (!file.type.startsWith('image/')) {

        console.warn(
          `${file.name} n'est pas une image.`
        );

        return;
      }


      // Vérifier la taille
      const maxSize = 10 * 1024 * 1024;

      if (file.size > maxSize) {

        console.warn(
          `${file.name} dépasse la taille maximale de 10 MB.`
        );

        return;
      }


      // Créer une URL temporaire pour la preview
      const url = URL.createObjectURL(file);


      // Première image = image principale
      const primary = this.imagePreviews.length === 0;


      this.imagePreviews.push({
        file,
        url,
        primary
      });

    });


    // Permet de sélectionner à nouveau le même fichier
    input.value = '';
  }


  // ==========================================================
  // SUPPRIMER UNE IMAGE
  // ==========================================================

  removeImage(index: number): void {

    if (
      index < 0 ||
      index >= this.imagePreviews.length
    ) {
      return;
    }


    const image = this.imagePreviews[index];


    // Libérer la mémoire
    URL.revokeObjectURL(image.url);


    const wasPrimary = image.primary;


    // Supprimer l'image
    this.imagePreviews.splice(index, 1);


    // Si l'image principale a été supprimée
    if (wasPrimary && this.imagePreviews.length > 0) {

      this.imagePreviews.forEach(
        img => img.primary = false
      );

      this.imagePreviews[0].primary = true;
    }
  }


  // ==========================================================
  // DÉFINIR UNE IMAGE COMME PRINCIPALE
  // ==========================================================

  setPrimaryImage(index: number): void {

    if (
      index < 0 ||
      index >= this.imagePreviews.length
    ) {
      return;
    }


    this.imagePreviews.forEach(
      image => image.primary = false
    );


    this.imagePreviews[index].primary = true;
  }


  // ==========================================================
  // PUBLICATION
  // ==========================================================

  onSubmit(): void {

    // Vérifier le formulaire
    if (this.propertyForm.invalid) {

      this.propertyForm.markAllAsTouched();

      return;
    }


    this.submitting = true;


    // Récupérer les données
    const propertyData = this.propertyForm.value;


    console.log(
      'Données du bien :',
      propertyData
    );


    console.log(
      'Images :',
      this.imagePreviews
    );


    /*
    ==========================================================
    ICI : appel à ton backend Spring Boot
    ==========================================================

    this.propertyService.createProperty(propertyData)
      .subscribe({

        next: (property) => {

          console.log(
            'Bien créé :',
            property
          );

          // Ensuite upload des images vers S3
          this.uploadImages(property.id);

        },

        error: (error) => {

          console.error(
            'Erreur lors de la création :',
            error
          );

          this.submitting = false;

        }

      });
    */


    // TEMPORAIRE POUR TESTER L'INTERFACE

    setTimeout(() => {

      console.log('Annonce publiée !');

      this.submitting = false;

    }, 1000);
  }


  // ==========================================================
  // ENREGISTRER COMME BROUILLON
  // ==========================================================

  saveDraft(): void {

    const draft = this.propertyForm.value;

    console.log(
      'Brouillon :',
      draft
    );


    // Exemple avec localStorage
    localStorage.setItem(
      'immohorizon_property_draft',
      JSON.stringify(draft)
    );

  }


  // ==========================================================
  // ANNULER
  // ==========================================================

  cancel(): void {

    this.router.navigate([
      '/employee/dashboard/properties'
    ]);

  }


  // ==========================================================
  // RESET DU FORMULAIRE
  // ==========================================================

  resetForm(): void {

    this.propertyForm.reset({

      transactionType: 'VENTE',

      pays: 'Belgique',

      etat: 'Disponible'

    });


    this.clearImages();

  }


  // ==========================================================
  // SUPPRIMER TOUTES LES IMAGES
  // ==========================================================

  private clearImages(): void {

    this.imagePreviews.forEach(image => {

      URL.revokeObjectURL(image.url);

    });


    this.imagePreviews = [];

  }


  // ==========================================================
  // DESTRUCTION DU COMPOSANT
  // ==========================================================

  ngOnDestroy(): void {

    this.clearImages();

  }
}
