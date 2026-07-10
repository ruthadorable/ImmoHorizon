export interface CriteresRecherche {
  commune: string| null;
  minPrix?: number| null;
  maxPrix?: number| null;
  type?: string| null;
  typeDeBien?: string| null;
  chambres?: number| null;
  salleDeBain?: number| null;
  minSuperficie?: number| null;
  maxSuperficie?: number| null;
  disponible?:boolean| null;
  etat?: string| null;
  etages?: number| null;
  parking?: boolean| null;
  meuble?: boolean| null;
  jardin?: boolean| null;
  terrasse?:boolean| null;
  garage?: boolean| null;
  cave?: boolean| null;
  ascenseur ?:boolean|null;
  surfaceJarTerrasse?:number| null;
  anneeDeConstruction?:number| null;
  peb?:string| null;
}