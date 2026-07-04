package com.immohorizon.propertymanagement.services.impl;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.immohorizon.propertymanagement.config.EnvConfig;
import com.immohorizon.propertymanagement.model.File;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.immohorizon.propertymanagement.repository.FileRepository;
import com.immohorizon.propertymanagement.services.IFileService;
import com.immohorizon.propertymanagement.Enum.DocumentType;
import java.io.InputStream;
import java.util.List;

@Service
public class FileService implements IFileService {
    @Autowired
    private FileRepository fileRepo;

    private String awsS3AccessKey= EnvConfig.get("AWS_ACCESS_KEY");

    private String awsS3SecretKey=EnvConfig.get("AWS_SECRET_KEY");


    @Override
    public File saveFile(MultipartFile file,String name){
        String saveFileUrl=saveFileToAWSS3Bucket(file);
        File fileToSave= File.builder()
                .fileUrl(saveFileUrl)
                .name(name)
                .build();
        return fileRepo.save(fileToSave);
    }
    @Override
    public List<File> getAllFiles(){
        return fileRepo.findAll(Sort.by(Sort.Direction.DESC,"id"));
    }
    private String saveFileToAWSS3Bucket(MultipartFile file){
        try{
            String s3FileName= file.getOriginalFilename();
            BasicAWSCredentials awsCredentials= new BasicAWSCredentials(awsS3AccessKey,awsS3SecretKey);
            AmazonS3 amazonS3Client = AmazonS3ClientBuilder.standard()
                    .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                    .withRegion(Regions.US_EAST_1)
                    .build();
            InputStream inputStream= file.getInputStream();
            ObjectMetadata objectMetadata= new ObjectMetadata();
            objectMetadata.setContentType("image/jpeg");
            String bucketName="file-upload-immohorizon";
            PutObjectRequest putObjectRequest= new PutObjectRequest(bucketName,s3FileName,inputStream,objectMetadata);
            amazonS3Client.putObject(putObjectRequest);
            return "https://"+bucketName+ ".s3.amazonaws.com/"+s3FileName;



        }catch(Exception e){
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());

        }
    }

}
