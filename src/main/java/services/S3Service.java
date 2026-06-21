package services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.UUID;

@Service
public class S3Service {
    private final S3Client s3Client = S3Client.builder()
            .region(Region.EU_WEST_3)
            .build();

    private final String bucket = "ton-bucket";

    public String upload(MultipartFile file) throws IOException {

        String fileName = UUID.randomUUID() + "-" + file.getOriginalFilename();

        PutObjectRequest request = PutObjectRequest.builder()
                .bucket(bucket)
                .key(fileName)
                .contentType(file.getContentType())
                .build();

        s3Client.putObject(request,
                RequestBody.fromBytes(file.getBytes()));

        return "https://" + bucket + ".s3.eu-west-3.amazonaws.com/" + fileName;
    }
}
