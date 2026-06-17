package model;

import jakarta.persistence.*;
import lombok.*;
import Enum.DocumentType;
import java.time.LocalDateTime;

@Data
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="documents")
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;

    private String originalFileName;

    private String contentType;

    private Long size;

    private String s3Key;

    private String fileUrl;

    @Enumerated(EnumType.STRING)
    private DocumentType documentType;

    private LocalDateTime uploadedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "candidature_id")
    private Candidature candidature;

    @PrePersist
    public void prePersist() {
        uploadedAt = LocalDateTime.now();
    }



}
