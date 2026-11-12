
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { DemandeVisiteComponent } from '../../pages/demande-visite/demande-visite.component';
import { MatDividerModule } from '@angular/material/divider';
import { BienService } from '../../services/biens/bien.service';
import { Bien } from '../../models/bien.model';
import { ReservationService } from '../../services/reservation/reservation.service';

export interface DemandeVisiteDialogData {
  idBien: number;
  dateVisite: Date;
  heureVisite: string;
}

@Component({
  selector: 'app-visit-form-dialog',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatDividerModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,MatSelectModule, MatCheckboxModule,
    MatCheckboxModule, MatIconModule,MatOptionModule,MatButtonModule,MatFormFieldModule,MatRadioModule,MatInputModule],
  templateUrl: './visit-form-dialog.component.html',
  styleUrl: './visit-form-dialog.component.css'
})
export class VisitFormDialogComponent {
  demandeForm: FormGroup;
  etape=1;
  fichiers: File[] = [];
  erreurFichier: string | null = null;
  bien: Bien | null = null;
  agent= {
    nom: 'Dupont',
    prenom: 'Emilie',
    email: 'emilie.dupont@immo-horizon.be'
  }

  readonly tailleMaxFichier = 5 * 1024 * 1024;

  readonly formatsAutorises = [
    'pdf',
    'doc',
    'docx',
    'txt',
    'jpg',
    'jpeg',
    'png'
  ];
 

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DemandeVisiteComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: DemandeVisiteDialogData,
    private bienService: BienService,
    private reservationService: ReservationService
  ) {

    this.demandeForm = this.fb.group({

      titre: ['', Validators.required],

      prénom: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],

      nom: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],

      email: ['', [
        Validators.required,
        Validators.email
      ]],

      telephone: ['', [
        Validators.required,
        Validators.pattern(/^[+0-9\s().-]{8,20}$/)
      ]],

      dateEntree: ['', Validators.required],

      occupants: [1, [
        Validators.required,
        Validators.min(1)
      ]],

      enfants: [false, Validators.required],

      animaux: [false, Validators.required],

      revenuSuffisant: [false, Validators.required],

      garant: [false, Validators.required],

      commentaires: ['']

    });

    this.bienService.getPropertyById(this.data.idBien).subscribe((bien) => {
      this.bien = bien;
    });
  }


onFileSelected(event: Event): void {

  const input = event.target as HTMLInputElement;

  if (!input.files || input.files.length === 0) {
    return;
  }

  const fichiersSelectionnes = Array.from(input.files);

  const extensionsAutorisees = [
    'pdf', 'doc', 'txt', 'jpg', 'jpeg', 'png'
  ];

  this.erreurFichier = '';

  for (const fichier of fichiersSelectionnes) {

    const extension = fichier.name
      .split('.')
      .pop()
      ?.toLowerCase();

    if (!extension || !extensionsAutorisees.includes(extension)) {
      this.erreurFichier = `Le fichier ${fichier.name} possède un format non autorisé.`;
      continue;
    }

    if (fichier.size > 5 * 1024 * 1024) {
      this.erreurFichier = `Le fichier ${fichier.name} dépasse la taille maximale de 5 Mo.`;
      continue;
    }

    // Éviter les doublons
    const existe = this.fichiers.some(
      f => f.name === fichier.name && f.size === fichier.size
    );

    if (!existe) {
      this.fichiers.push(fichier);
    }
  }

  // Permet de sélectionner à nouveau le même fichier
  input.value = '';
}

  /**
   * Supprimer le document sélectionné.
   */
  supprimerFichier(index: number): void {
    this.fichiers.splice(index, 1);
  }

  /**
   * Vérifier les informations avant de passer à l'étape suivante.
   */
  suivant(): void {

    this.demandeForm.markAllAsTouched();

    if (this.demandeForm.invalid) {
      return;
    }
    this.etape +=1;

    
  }

  /**
   * Fermer la fenêtre sans envoyer la demande.
   */
  fermer(): void {
    this.dialogRef.close();
  }

  /**
   * Vérifier si un champ est invalide et a été touché.
   */
  champInvalide(nomChamp: string): boolean {

    const champ = this.demandeForm.get(nomChamp);

    return !!champ && champ.invalid &&
      (champ.touched || champ.dirty);
  }


retour(): void {
  this.etape = 1;
}

confirmerReservation(): void {
  this.etape+=1;
  const resultat = {
    ...this.demandeForm.value,
    idBien: this.data.idBien,
    dateVisite: this.data.dateVisite,
    heureVisite: this.data.heureVisite,
    document: this.fichiers
  };
  console.log('Données de réservation à envoyer :', resultat);
   this.reservationService
    .creerReservation(resultat, this.fichiers)
    .subscribe({
      next: () => {
        this.etape += 1;
        console.log('Réservation créée avec succès');
      },
      error: (error) => {
        console.error(
          'Erreur lors de la réservation',
          error
        );
      }
    });

  // Les données sont transmises au composant parent.
    // Le parent pourra ensuite afficher l'étape suivante.
    if(this.etape === 4) {
    this.dialogRef.close({
      ...this.demandeForm.value,
      idBien: this.data.idBien,
      dateVisite: this.data.dateVisite,
      heureVisite: this.data.heureVisite,
      documents: this.fichiers
    });}
}

}
