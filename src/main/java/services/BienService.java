package services;

import model.Bien;
import org.springframework.stereotype.Service;
import util.RandomGenerator;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;
import Enum.TypeBien;

@Service
public class BienService {
    public List<Bien> generateDummyBien(int count){
        List<Bien> biens = new ArrayList<>();
        Random random = new Random();

        String[] types = {"Maison", "Appartement", "Villa", "Studio"};
        String[] communes = {"Bruxelles", "Ixelles", "Uccle", "Anderlecht", "Woluwe"};
        String[] etats = {"Bon état", "À rénover", "Neuf"};
        String[] rues = {"Rue de la Paix", "Avenue Louise", "Chaussée de Namur"};

        for (int i = 0; i < count; i++) {

            Bien b = new Bien();
            TypeBien randomType = TypeBien.values()[ThreadLocalRandom.current().nextInt(TypeBien.values().length)];
            b.setTypeDeBien(randomType.toString());
            b.setDescription("Bien numéro " + i);

            b.setPrix(100000 + random.nextInt(900000));
            b.setSuperficie(50 + random.nextInt(200));
            b.setChambres(1 + random.nextInt(5));
            char randomChar = (char) ('A' + random.nextInt(6));
            b.setPeb(randomChar);
            b.setRue(rues[random.nextInt(rues.length)]);
            b.setNumero(1 + random.nextInt(200));
            b.setCode_postal (1000 + random.nextInt(2000));
            b.setCommune(communes[random.nextInt(communes.length)]);

            b.setFacades(1 + random.nextInt(4));
            b.setAnnee_construction(1950 + random.nextInt(70));
            //Set random Date from now upto 6 months
            LocalDate start = LocalDate.now();
            LocalDate end = start.plusMonths(6);

            long randomEpochDay = ThreadLocalRandom.current()
                    .longs(start.toEpochDay(), end.toEpochDay())
                    .findFirst()
                    .getAsLong();
            LocalDate randomDate = LocalDate.ofEpochDay(randomEpochDay);
            b.setDisponibilité(randomDate);
            b.setEtat(etats[random.nextInt(etats.length)]);

            b.setEtages(random.nextInt(10));

            b.setEnergieTotale(random.nextInt(500));
            b.setEnergieSpecifique(random.nextInt(250));
            b.setEmissionCO2(random.nextInt(250));
            //Créer une surface aléatoire réaliste
            RandomGenerator surfaceGen= new RandomGenerator();
            b.setSurfaceHabitable((int) surfaceGen.generateSurface(randomType));
            b.setCave(random.nextBoolean());
            b.setParking(random.nextBoolean());
            b.setGarage(random.nextBoolean());
            b.setJardin(random.nextBoolean());
            b.setTerrasse(random.nextBoolean());

            b.setSurfaceJardinTerrasse(random.nextInt(200));


            boolean bool = LocalDate.now().isAfter(randomDate)  || LocalDate.now().isEqual(randomDate);
            b.setDisponible(bool);

            biens.add(b);
        }

        return biens;
    }
}
