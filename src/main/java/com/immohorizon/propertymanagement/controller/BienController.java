package com.immohorizon.propertymanagement.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.immohorizon.propertymanagement.dto.BienDto;
import com.immohorizon.propertymanagement.dto.CritereRechercheDto;
import com.immohorizon.propertymanagement.dto.PropertyRequest;
import com.immohorizon.propertymanagement.model.Bien;
import com.immohorizon.propertymanagement.repository.BienRepository;
import com.immohorizon.propertymanagement.services.BienService;
import com.immohorizon.propertymanagement.services.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/biens")
@CrossOrigin(origins = "http://localhost:4200")
public class BienController
{
    private final BienService bienService;
    private final S3Service s3Service;
    private final ObjectMapper objectMapper;
    private final BienRepository repository;
    @Autowired
    public BienController(BienService bienService , S3Service s3Service, ObjectMapper objectMapper, BienRepository repository) {
        this.bienService = bienService;
        this.s3Service=s3Service;
        this.repository = repository;
        this.bienService.generateDummyBien(20);
        this.objectMapper=objectMapper;
    }
    @GetMapping("/all")
    public ResponseEntity<List<Bien>> getAllBiens() {
        return ResponseEntity.ok(
                bienService.getAllBiens()
        );
    }
    @GetMapping("/{id}")
    public Bien getBien(@PathVariable long id){

        Bien bien = repository.findById(id)
                .orElseThrow();


        bien.getImages()
                .forEach(image -> {

                    image.setUrl(
                            s3Service.generateUrl(
                                    image.getImageKey()
                            )
                    );

                });


        return bien;
    }
    @PostMapping(
            value = "/create",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<?> createProperty(
            @RequestPart("property") BienDto request,
            @RequestPart(value = "images", required = false)
            List<MultipartFile> images
    ) throws Exception {

        List<String> imageKeys = new ArrayList<>();

        if (images != null) {
            for (MultipartFile image : images) {
                imageKeys.add(s3Service.uploadFile(image));


            }
        }
        bienService.creerBien(request,images);

        return ResponseEntity.ok(imageKeys);
    }



    /**
     * Recherche simple
     * GET /api/biens/recherche?motCle=Paris
     */
    @GetMapping("/recherche")
    public List<Bien> rechercheRapide(@RequestParam String motCle) {

        return bienService.rechercheRapide(motCle);
    }

    /**
     * Recherche détaillée
     * POST /api/biens/recherche-detaillee
     */
    @PostMapping("/search")
    public List<Bien> rechercheDetaillee(
            @RequestBody CritereRechercheDto critere) {

        return bienService.rechercheDetaillee(critere);
    }

    @GetMapping("/type/avendre")
    public List<Bien> getBiensAvendre() {
        return bienService.getBiensAVendre();
    }
    @GetMapping("/type/alouer")
    public List<Bien> getBienAlouer() {
        return bienService.getBiensALouer();
    }
    @PutMapping(
            value="/{id}/update",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<?> updateProperty(

            @PathVariable int id,

            @RequestPart("property")
            BienDto request,


            @RequestPart(
                    value="images",
                    required=false
            )
            List<MultipartFile> images,


            @RequestPart(
                    value="deletedImages",
                    required=false
            )
            String deletedImagesJson

    ) throws IOException {


        List<Integer> deletedImages =
                objectMapper.readValue(
                        deletedImagesJson,
                        new TypeReference<List<Integer>>() {}
                );


        Bien updatedBien =
                bienService.updateBien(
                        id,
                        request,
                        images,
                        deletedImages
                );


        return ResponseEntity.ok(updatedBien);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteBien(
            @PathVariable Long id) {

        bienService.deleteBien(id);

        return ResponseEntity.noContent().build();

    }
}
