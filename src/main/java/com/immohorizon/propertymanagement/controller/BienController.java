package com.immohorizon.propertymanagement.controller;

import com.immohorizon.propertymanagement.dto.CritereRechercheDto;
import com.immohorizon.propertymanagement.dto.PropertyRequest;
import com.immohorizon.propertymanagement.model.Bien;
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
    @Autowired
    public BienController(BienService bienService , S3Service s3Service) {
        this.bienService = bienService;
        this.s3Service=s3Service;
        this.bienService.generateDummyBien(100);
    }
    @GetMapping("/all")
    public ResponseEntity<List<Bien>> getAllBiens() {
        return ResponseEntity.ok(
                bienService.getAllBiens()
        );
    }
    @PostMapping(
            value = "/create",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<?> createProperty(
            @RequestPart("property")
            PropertyRequest request,

            @RequestPart("images")
            List<MultipartFile> images
    ) throws IOException {

        List<String> imageKeys = new ArrayList<>();

        for (MultipartFile image : images) {
            imageKeys.add(
                    s3Service.uploadFile(image)
            );
        }

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
    @PostMapping("/recherche-detaillee")
    public List<Bien> rechercheDetaillee(
            @RequestBody CritereRechercheDto critere) {

        return bienService.rechercheDetaillee(critere);
    }
}
