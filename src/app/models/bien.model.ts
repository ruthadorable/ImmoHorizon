import { Image } from "./image.model";
export class Bien {

        id?: number;
        title?: string;

        typeDeBien?: string;

        description?: string;

        prix?: number;

        superficie?: number;

        chambres?: number;

        peb?: string;

        energieTotale?: number;

        energieSpecifique?: number;

        emissionCO2?: number;

        rue?: string;

        numero?: number;

        code_postal?: number;

        commune?: string;

        facades?: number;

        annee_construction?: number;

        disponibilite?: Date;

        etat?: string;

        etages?: number;

        parking?: boolean;

        garage?: boolean;

        jardin?: boolean;

        terrasse?: boolean;

        cave?: number;

        surfaceJardinTerrasse?: number;

        disponible?: boolean;

        proprietaireId?: number;

        locataireId?: number;

        imageUrl?:string;

        images?: Image[];
}
