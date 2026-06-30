package com.immohorizon.propertymanagement.services;

import com.immohorizon.propertymanagement.model.File;
import org.springframework.web.multipart.MultipartFile;
import com.immohorizon.propertymanagement.Enum.DocumentType;
import java.util.List;

public interface IFileService {
    File  saveFile(MultipartFile file, String name);
    List<File> getAllFiles();

}
