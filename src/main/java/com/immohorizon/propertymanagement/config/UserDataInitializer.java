package com.immohorizon.propertymanagement.config;
import com.immohorizon.propertymanagement.Enum.Role;
import com.immohorizon.propertymanagement.model.User;
import com.immohorizon.propertymanagement.repository.UserRepository;

import net.datafaker.Faker;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Locale;

@Configuration
public class UserDataInitializer {
    @Bean
    CommandLineRunner generateUsers(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {

            Faker faker = new Faker(Locale.FRANCE);

            int nombreUtilisateurs = 100;

            for (int i = 0; i < nombreUtilisateurs; i++) {

                String prenom = faker.name().firstName();
                String nom = faker.name().lastName();

                String email = "user" + (i + 1) + "@immohorizon.be";

                // Eviter les doublons
                if (!userRepository.existsByEmail(email)) {

                    User user = User.builder()
                            .nom(nom)
                            .prenom(prenom)
                            .email(email)
                            .password(passwordEncoder.encode("User123!"))
                            .noGsm(faker.phoneNumber().cellPhone())
                            .role(Role.valueOf("CLIENT"))
                            .build();

                    userRepository.save(user);
                }
            }

            System.out.println("100 utilisateurs générés avec succès !");
        };
    }
}
