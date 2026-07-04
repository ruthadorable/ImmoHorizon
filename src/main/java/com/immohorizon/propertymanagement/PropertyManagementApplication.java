package com.immohorizon.propertymanagement;

import com.immohorizon.propertymanagement.repository.BienRepository;
import com.immohorizon.propertymanagement.services.BienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.*;


@SpringBootApplication
public class PropertyManagementApplication {
    public static void main(String[] args) {

        SpringApplication.run(PropertyManagementApplication.class, args);

    }

}
