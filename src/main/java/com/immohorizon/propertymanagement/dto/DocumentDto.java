package com.immohorizon.propertymanagement.dto;

import com.immohorizon.propertymanagement.Enum.DocumentType;
import com.immohorizon.propertymanagement.model.Candidature;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DocumentDto {

    private Long id;

    private String fileName;

    private String originalFileName;

    private String contentType;

    private Long size;

    private String fileUrl;

    private DocumentType documentType;

    private Candidature candidature;
}
