package com.immohorizon.propertymanagement.services;

import com.immohorizon.propertymanagement.dto.BienDto;
import com.immohorizon.propertymanagement.dto.CritereRechercheDto;
import com.immohorizon.propertymanagement.model.Bien;
import com.immohorizon.propertymanagement.model.Image;
import com.immohorizon.propertymanagement.repository.BienRepository;
import jakarta.transaction.Transactional;
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
        if (images != null && !images.isEmpty()) {
        for (MultipartFile file : images) {

            String key = s3Service.uploadFile(file);

            Image img = new Image();
            img.setImageKey(key);
            img.setBien(bien);

            bien.getImages().add(img);
        }}

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
            List<Bien> biens = bienRepository.findAll();

            System.out.println("Total biens: " + biens.size());
            System.out.println("Criteria: " + critere);

            List<Bien> result =  bienRepository.findAll()
                    .stream()
                    .filter(b -> critere.getCommune() == null ||
                            b.getCommune().equalsIgnoreCase(critere.getCommune()))

                    .filter(b -> critere.getType() == null ||
                            b.getType().equalsIgnoreCase(critere.getType()))
                    .filter(b -> critere.getTypeDeBien() == null ||
                            b.getTypeDeBien().equalsIgnoreCase(critere.getTypeDeBien()))

                    .filter(b -> critere.getMinPrix() == null ||
                            b.getPrix() >= critere.getMinPrix())

                    .filter(b -> critere.getMaxPrix() == null ||
                            b.getPrix() <= critere.getMaxPrix())
                    .filter(b -> critere.getMinSuperficie() == null ||
                            b.getSurfaceHabitable() >= critere.getMinSuperficie())
                    .filter(b -> critere.getMaxSuperficie() == null ||
                            b.getSurfaceHabitable() >= critere.getMaxSuperficie())
                    .filter(b -> critere.getChambres() == null ||
                            b.getChambres() == critere.getChambres())
                    .filter(b -> critere.getSalleDeBain() == null ||
                            b.getSalleDeBain() == critere.getSalleDeBain())
                    .filter(b -> critere.getPeb() == null ||
                            b.getPeb().equals(critere.getPeb()))
                    .filter(b -> critere.getJardin() == null ||
                            b.getJardin().equals(critere.getJardin()))
                    .filter(b -> critere.getGarage() == null ||
                            b.getGarage().equals(critere.getGarage()))
                    .filter(b -> critere.getParking() == null ||
                            b.getParking().equals(critere.getParking()))
                    .filter(b -> critere.getTerrasse() == null ||
                            b.getTerrasse().equals(critere.getTerrasse()))
                    .filter(b -> critere.getMeuble() == null ||
                            b.getMeuble().equals(critere.getMeuble()))
                    .filter(b -> critere.getAscenseur() == null ||
                            b.getAscenseur().equals(critere.getAscenseur()))
                    .filter(b -> critere.getDisponible() == null ||
                            b.isDisponible() ==critere.getDisponible())
                    .filter(b -> critere.getCave() == null ||
                            b.isCave() == critere.getCave() )
                    .filter(b -> critere.getEtat()==null ||
                            b.getEtat().equals(critere.getEtat()))
                    .filter(b -> critere.getEtages()==null ||
                            b.getEtages() == critere.getEtages())
                    .filter(b -> critere.getSurfaceJarTerrasse()==null ||
                            b.getSurfaceJardinTerrasse() == critere.getSurfaceJarTerrasse())
                    .filter(b -> critere.getAnneeDeConstruction()== 0 ||
                                            b.getAnnee_construction() ==critere.getAnneeDeConstruction())

                    .collect(Collectors.toList());
            System.out.println("Results: " + result.size());
            return result;
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
