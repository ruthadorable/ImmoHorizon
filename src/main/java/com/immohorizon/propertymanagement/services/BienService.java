package com.immohorizon.propertymanagement.services;

import com.immohorizon.propertymanagement.dto.BienDto;
import com.immohorizon.propertymanagement.dto.CritereRechercheDto;
import com.immohorizon.propertymanagement.model.Bien;
import com.immohorizon.propertymanagement.model.Image;
import com.immohorizon.propertymanagement.repository.BienRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import util.RandomGenerator;

import java.io.IOException;
import java.time.LocalDate;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

import com.immohorizon.propertymanagement.Enum.TypeBien;

@Slf4j
@Service
public class BienService {

    private final BienRepository bienRepository;
    private final S3Service s3Service;
    @Autowired
    public BienService(BienRepository bienRepository,S3Service s3Service) {
        this.bienRepository = bienRepository;
        this.s3Service=s3Service;
    }
    public Bien creerBien(BienDto bienDto, List<MultipartFile> images) throws Exception {

        Bien bien = new Bien();
        bien.setTitle(bienDto.getTitle());
        bien.setDescription(bienDto.getDescription());
        bien.setPrix(bienDto.getPrix());
        bien.setCommune(bienDto.getCommune());
        bien.setAscenseur(bienDto.isAscenceur());
        bien.setType(bienDto.getType());
        bien.setTypeDeBien(bienDto.getTypeDeBien());
        bien.setSuperficie(bienDto.getSuperficie());
        bien.setChambres(bienDto.getChambres());
        bien.setPeb(bienDto.getPeb());
        bien.setEnergieTotale(bienDto.getEnergieTotale());
        bien.setEnergieSpecifique(bienDto.getEnergieSpecifique());
        bien.setEmissionCO2(bienDto.getEmissionCO2());
        bien.setRue(bienDto.getRue());
        bien.setNumero(bienDto.getNumero());
        bien.setCode_postal(bien.getCode_postal());
        bien.setCommune(bienDto.getCommune());
        bien.setFacades(bienDto.getFacades());
        bien.setAnnee_construction(bienDto.getAnnee_construction());
        bien.setType_chauffage(bienDto.getType_chauffage());
        bien.setDisponibilite(bienDto.getDisponibilite());
        bien.setEtat(bienDto.getEtat());
        bien.setEtages(bienDto.getEtages());
        bien.setParking(bienDto.isParking());
        bien.setGarage(bienDto.isGarage());
        bien.setJardin(bienDto.isJardin());
        bien.setTerrasse(bienDto.isTerrasse());
        bien.setCave(bienDto.isCave());
        bien.setDisponible(bienDto.isDisponible());
        bien.setSurfaceHabitable(bienDto.getSurfaceHabitable());
        bien.setSurfaceJardinTerrasse(bienDto.getSurfaceJardinTerrasse());
        try {
            if (images != null && !images.isEmpty()) {
                boolean firstImage = true;

                for (MultipartFile file : images) {
                    if (file == null || file.isEmpty()) {
                        continue;
                    }

                    // Upload the file to AWS S3
                    String key = s3Service.uploadFile(file);

                    log.info("Image uploaded successfully to S3: {}", key);

                    // Create the database image entity
                    Image img = new Image();
                    img.setImageKey(key);
                    img.setUrl(s3Service.generateUrl(key));
                    // First uploaded image becomes the primary image
                    img.setPrimary(firstImage);
                    img.setBien(bien);
                    bien.getImages().add(img);

                    firstImage = false;
                }
            }
        } catch (Exception e) {
            log.error("Failed to upload property images to S3", e);
            throw e;
        }
        /*
         * Ensure one primary image
         */

        boolean hasPrimary =
                bien.getImages()
                        .stream()
                        .anyMatch(
                                Image::isPrimary
                        );


        if(!hasPrimary &&
                !bien.getImages().isEmpty()){


            bien.getImages()
                    .get(0)
                    .setPrimary(true);

        }

        return bienRepository.save(bien);
    }

    public List<Bien> getAllBiens() {
        return bienRepository.findAll();
    }

    public Bien getBienById(long id){

        return bienRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bien not found with id: " + id));
    }

    public List<Bien> generateDummyBien(int count){
        List<Bien> biens = new ArrayList<>();
        Random random = new Random();

        String[] types = {"Maison", "Appartement", "Villa", "Studio"};
        String[] communes = {"Bruxelles", "Ixelles", "Uccle", "Anderlecht", "Woluwe","Nivelles","Wavre","Liège","Anvers","Dendermonde","Halle","Arlon"};
        String[] etats = {"Bon état", "À rénover", "Neuf"};
        String[] rues = {"Rue de la Paix", "Avenue Louise", "Chaussée de Namur"};
        List<String> type= Arrays.asList("A louer","A vendre");

        for (int i = 0; i < count; i++) {

            Bien b = new Bien();
            TypeBien randomType = TypeBien.values()[ThreadLocalRandom.current().nextInt(TypeBien.values().length)];
            b.setTypeDeBien(randomType.toString());
            b.setDescription("Alliant confort et fonctionnalité, ce bien se compose d'un spacieux hall d'entrée, d'un grand et lumineux séjour/salle à manger, d'une cuisine équipée, d'une salle de bain, d'un wc séparé ainsi que de deux terrasses. ");
            b.setType( type.get(random.nextInt(2)));
            if(b.getType().equalsIgnoreCase("A Vendre")){
                b.setPrix(100000 + random.nextInt(900000));
            }
            else{
                b.setPrix(500+ random.nextInt(1500));
            }
            b.setSuperficie(50 + random.nextInt(200));
            b.setChambres(1 + random.nextInt(5));
            char randomChar = (char) ('A' + random.nextInt(6));
            b.setPeb(randomChar+"");
            b.setRue(rues[random.nextInt(rues.length)]);
            b.setNumero(1 + random.nextInt(200));
            b.setCode_postal (1000 + random.nextInt(2000));
            b.setCommune(communes[random.nextInt(communes.length)]);

            b.setFacades(1 + random.nextInt(4));
            b.setAnnee_construction(1950 + random.nextInt(70));
            //Set random Date from now upto 6 months
            LocalDate start = LocalDate.now().minusMonths(3);;
            LocalDate end = LocalDate.now().plusMonths(6);
            long startEpochDay = start.toEpochDay();
            long endEpochDay = end.toEpochDay();
            long randomEpochDay = ThreadLocalRandom.current()
                    .nextLong(startEpochDay, endEpochDay + 1);
            LocalDate randomDate = LocalDate.ofEpochDay(randomEpochDay);
            b.setDisponibilite(randomDate);
            b.setDisponibilite(randomDate);
            b.setEtat(etats[random.nextInt(etats.length)]);
            b.setEtages(random.nextInt(10));
            b.setSalleDeBain(1+random.nextInt(3));
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
            bienRepository.save(b);
        }

        return biens;
    }

    public List<Bien> getBiensALouer() {
        return bienRepository.findByTypeIgnoreCase("A louer");
    }

    public List<Bien> getBiensAVendre() {
        return bienRepository.findByTypeIgnoreCase("A vendre");
    }

    public List<Bien> getBiensRecents() {

        LocalDate futur = LocalDate.now().plusMonths(3);
        LocalDate passe = LocalDate.now().minusMonths(3);

        return bienRepository.findByDisponibiliteBetween(
                passe,
                futur
        );
    }


        /**
         * Recherche rapide par mot-clé
         */
        public List<Bien> rechercheRapide(String motCle) {

            return bienRepository
                    .findByCommuneContainingIgnoreCaseOrTypeDeBienContainingIgnoreCase(
                            motCle,
                            motCle
                    );
        }

        /**
         * Recherche détaillée
         */

        public List<Bien> rechercheDetaillee(CritereRechercheDto critere) {

            if (critere == null) {
                throw new IllegalArgumentException(
                        "Les critères de recherche ne peuvent pas être null."
                );
            }

            List<Bien> biens = bienRepository.findAll();

            System.out.println("Total biens : " + biens.size());
            System.out.println("Critères : " + critere);

            List<Bien> result = biens.stream()

                    // Commune
                    .filter(b -> matchesIgnoreCase(
                            b.getCommune(), critere.getCommune()
                    ))

                    // Type et type de bien
                    .filter(b -> matchesIgnoreCase(
                            b.getType(), critere.getType()
                    ))
                    .filter(b -> matchesIgnoreCase(
                            b.getTypeDeBien(), critere.getTypeDeBien()
                    ))

                    // Prix minimum et maximum
                    .filter(b -> matchesMin(
                            b.getPrix(), critere.getMinPrix()
                    ))
                    .filter(b -> matchesMax(
                            b.getPrix(), critere.getMaxPrix()
                    ))

                    // Superficie minimum et maximum
                    .filter(b -> matchesMin(
                            b.getSurfaceHabitable(), critere.getMinSuperficie()
                    ))
                    .filter(b -> matchesMax(
                            b.getSurfaceHabitable(), critere.getMaxSuperficie()
                    ))

                    // Nombre de chambres et salles de bain
                    .filter(b -> matchesNumber(
                            b.getChambres(), critere.getChambres()
                    ))
                    .filter(b -> matchesNumber(
                            b.getSalleDeBain(), critere.getSalleDeBain()
                    ))

                    // PEB
                    .filter(b -> matchesIgnoreCase(
                            b.getPeb(), critere.getPeb()
                    ))

                    // Équipements et caractéristiques booléennes
                    .filter(b -> matchesValue(
                            b.getJardin(), critere.getJardin()
                    ))
                    .filter(b -> matchesValue(
                            b.getGarage(), critere.getGarage()
                    ))
                    .filter(b -> matchesValue(
                            b.getParking(), critere.getParking()
                    ))
                    .filter(b -> matchesValue(
                            b.getTerrasse(), critere.getTerrasse()
                    ))
                    .filter(b -> matchesValue(
                            b.getMeuble(), critere.getMeuble()
                    ))
                    .filter(b -> matchesValue(
                            b.getAscenseur(), critere.getAscenseur()
                    ))
                    .filter(b -> matchesValue(
                            b.isDisponible(), critere.getDisponible()
                    ))
                    .filter(b -> matchesValue(
                            b.isCave(), critere.getCave()
                    ))

                    // État
                    .filter(b -> matchesValue(
                            b.getEtat(), critere.getEtat()
                    ))

                    // Nombre d'étages
                    .filter(b -> matchesNumber(
                            b.getEtages(), critere.getEtages()
                    ))

                    // Surface jardin / terrasse
                    .filter(b -> matchesNumber(
                            b.getSurfaceJardinTerrasse(),
                            critere.getSurfaceJarTerrasse()
                    ))

                    // Année de construction : 0 signifie aucun filtre
                    .filter(b -> isUnsetYear(critere.getAnneeDeConstruction())
                                    || matchesNumber(
                                    b.getAnnee_construction(),
                                    critere.getAnneeDeConstruction()
                            )
                    )

                    .collect(Collectors.toList());

            System.out.println("Résultats : " + result.size());

            return result;
        }


    private boolean matchesIgnoreCase(String actual, String requested) {
        return requested == null
                || requested.isBlank()
                || (actual != null
                && actual.equalsIgnoreCase(requested.trim()));
    }

    private boolean matchesMin(Number actual, Number minimum) {
        return minimum == null
                || (actual != null
                && actual.doubleValue() >= minimum.doubleValue());
    }

    private boolean matchesMax(Number actual, Number maximum) {
        return maximum == null
                || (actual != null
                && actual.doubleValue() <= maximum.doubleValue());
    }

    private boolean matchesNumber(Number actual, Number requested) {
        return requested == null
                || (actual != null
                && Double.compare(
                actual.doubleValue(),
                requested.doubleValue()
        ) == 0);
    }

    private boolean matchesValue(Object actual, Object requested) {
        return requested == null || Objects.equals(actual, requested);
    }

    private boolean isUnsetYear(Number year) {
        return year == null || year.doubleValue() == 0;
    }


    @Transactional
    public Bien updateBien(
            long id,
            BienDto request,
            List<MultipartFile> newImages,
            List<Integer> deletedImages
    ) throws IOException {


        Bien bien =
                bienRepository.findById(id)
                        .orElseThrow(
                                () -> new RuntimeException("Bien not found")
                        );


        /*
         * Update property fields
         */

        bien.setTitle(
                request.getTitle()
        );

        bien.setDescription(
                request.getDescription()
        );

        bien.setPrix(
                request.getPrix()
        );

        bien.setRue(
                request.getRue()
        );
        bien.setNumero(request.getNumero());
        bien.setCode_postal(request.getCode_postal());
        bien.setCommune(request.getCommune());


        /*
         * Remove deleted images
         */

        if(deletedImages != null){

            Iterator<Image> iterator =
                    bien.getImages().iterator();


            while(iterator.hasNext()){

                Image image = iterator.next();


                if(deletedImages.contains(image.getId())){


                    // remove from S3
                    s3Service.deleteFile(
                            image.getImageKey()
                    );


                    iterator.remove();

                }
            }
        }



        /*
         * Upload new images
         */

        if(newImages != null){


            for(MultipartFile file : newImages){


                String key =
                        s3Service.uploadFile(file);


                Image image =
                        new Image();


                image.setImageKey(key);

                image.setUrl(
                        s3Service.generateUrl(key)
                );


                image.setPrimary(false);


                image.setBien(bien);


                bien.getImages()
                        .add(image);

            }

        }



        /*
         * Ensure one primary image
         */

        boolean hasPrimary =
                bien.getImages()
                        .stream()
                        .anyMatch(
                                Image::isPrimary
                        );


        if(!hasPrimary &&
                !bien.getImages().isEmpty()){


            bien.getImages()
                    .get(0)
                    .setPrimary(true);

        }


        return bienRepository.save(bien);
    }
    public void deleteBien(Long id) {

        Bien bien = bienRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Property not found with id : " + id));

        bienRepository.delete(bien);

    }

}
