package com.immohorizon.propertymanagement.controller;

import com.immohorizon.propertymanagement.model.File;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.immohorizon.propertymanagement.services.impl.FileService;
import com.immohorizon.propertymanagement.Enum.DocumentType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;

@RestController
@RequestMapping("/file")
@CrossOrigin(origins="${FRONTEND_URL}")
public class FileController {
    @Autowired
    private FileService fileService;
    private static final Logger logger =
            LoggerFactory.getLogger(FileService.class);
    @PostMapping("/upload")
    public ResponseEntity<Object>saveFile(@RequestParam(required = false) MultipartFile file, @RequestParam(required=false) String name){
        if(file.isEmpty() || name.isEmpty()){
            logger.info("Error File or File name required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File and Name are required");
        }
        logger.info("File Saved!");
        return ResponseEntity.ok(fileService.saveFile(file,name));
    }
    @GetMapping("/get-all")
    public ResponseEntity<List<File>>getAllFiles(){
        logger.info(" Get all Files succeeded!");
        return ResponseEntity.ok(fileService.getAllFiles());
    }
}
