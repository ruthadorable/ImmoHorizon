import { Image } from "./image.model";
export class Bien {

        idBien?: number| null;
        title?: string| null;
        type?:string| null;
        typeDeBien?: string| null;
        description?: string| null;
        prix?: number| null;

        superficie?: number| null;

        chambres?: number| null;

        salleDeBain? :number| null;

        peb?: string| null;

        energieTotale?: number| null;

        energieSpecifique?: number| null;

        emissionCO2?: number| null;

        rue?: string| null;

        numero?: number| null;

        code_postal?: number| null;

        commune?: string| null;

        facades?: number| null;

        annee_construction?: number| null;

        disponibilite?: Date| null;

        etat?: string| null;

        etages?: number| null;

        parking?: boolean| null;

        garage?: boolean| null;

        jardin?: boolean| null;

        terrasse?: boolean| null;

        cave?: boolean| null;

        datePublication?: Date| null;

        surfaceJardinTerrasse?: number| null;

        disponible?: boolean| null;

        proprietaireId?: number| null;

        locataireId?: number| null;

        imageUrl?:string| null;

        images?: Image[]| null;
}
