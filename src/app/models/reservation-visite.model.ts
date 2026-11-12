export interface ReservationVisite {

  id?: number;

  // Informations du bien
  bienId: number;

  // Informations du demandeur
  nom: string;
  prenom: string;
  email: string;
  telephone: string;

  // Informations de la visite
  dateVisite: string;
  heureVisite: string;

  // Informations complémentaires
  nombreOccupants: number;
  nombreEnfants:number;
  animauxDomestiques: boolean;
  message?: string;

  // Statut de la réservation
  statut?: string;

  // Dates
  dateCreation?: string;

  documents?: File[]; // Ajout du champ pour les documents d'identité
}