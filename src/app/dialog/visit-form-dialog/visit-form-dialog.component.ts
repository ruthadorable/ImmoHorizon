
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

  fichier: File | null = null;
  erreurFichier: string | null = null;

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
    public data: DemandeVisiteDialogData
  ) {

    this.demandeForm = this.fb.group({

      titre: ['', Validators.required],

      prenom: ['', [
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

      enfants: ['non', Validators.required],

      animaux: ['', Validators.required],

      revenuSuffisant: ['', Validators.required],

      garant: ['', Validators.required],

      commentaires: ['']

    });
  }

  /**
   * Sélection d'un document justificatif.
   */
  onFileSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    this.erreurFichier = null;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const fichierSelectionne = input.files[0];

    const extension = fichierSelectionne.name
      .split('.')
      .pop()
      ?.toLowerCase();

    if (!extension || !this.formatsAutorises.includes(extension)) {
      this.erreurFichier =
        'Format non autorisé. Formats acceptés : PDF, DOC, DOCX, TXT, JPG, JPEG et PNG.';

      input.value = '';
      return;
    }

    if (fichierSelectionne.size > this.tailleMaxFichier) {
      this.erreurFichier =
        'Le document ne peut pas dépasser 5 Mo.';

      input.value = '';
      return;
    }

    this.fichier = fichierSelectionne;
  }

  /**
   * Supprimer le document sélectionné.
   */
  supprimerFichier(input?: HTMLInputElement): void {

    this.fichier = null;
    this.erreurFichier = null;

    if (input) {
      input.value = '';
    }
  }

  /**
   * Vérifier les informations avant de passer à l'étape suivante.
   */
  suivant(): void {

    this.demandeForm.markAllAsTouched();

    if (this.demandeForm.invalid) {
      return;
    }

    // Les données sont transmises au composant parent.
    // Le parent pourra ensuite afficher l'étape suivante.
    this.dialogRef.close({
      ...this.demandeForm.value,
      idBien: this.data.idBien,
      dateVisite: this.data.dateVisite,
      heureVisite: this.data.heureVisite,
      document: this.fichier
    });
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

}
