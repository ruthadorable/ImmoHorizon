package com.immohorizon.propertymanagement.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
public class S3Config {

        @Bean
        public S3Client s3Client(@Value("${aws.region}") String region,
                                 @Value("${aws.s3.access.keys}") String accessKey,
                                 @Value("${aws.s3.secret.keys}") String secretKey) {

            AwsBasicCredentials credentials = AwsBasicCredentials.create(accessKey, secretKey);

            return S3Client.builder()
                    .region(Region.of(region))
                    .credentialsProvider(StaticCredentialsProvider.create(credentials))
                    .build();
        }
}

