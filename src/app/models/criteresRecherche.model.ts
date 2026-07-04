export interface CriteresRecherche {
  commune: string;
  minPrix?: number;
  maxPrix?: number;
  typeDeBien?: string;
  chambres?: number;
  salleDeBain?: number;
  minSuperficie?: number;
  maxSuperficie?: number;
  etat?: string;
  etages?: number;
  parking?: boolean;
  meuble?: boolean;
  jardin?: boolean;
  terasse?:boolean;
  garage?: boolean;
}