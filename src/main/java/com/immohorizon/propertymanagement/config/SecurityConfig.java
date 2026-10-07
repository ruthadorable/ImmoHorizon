package com.immohorizon.propertymanagement.config;
import com.immohorizon.propertymanagement.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                .cors(Customizer.withDefaults())

                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                .authorizeHttpRequests(auth -> auth

                        // =========================
                        // PUBLIC
                        // =========================

                        .requestMatchers(
                                "/api/auth/**",
                                "/api/blog/**",
                                "/api/biens/search",
                                "/api/biens/type/avendre",
                                "/api/biens/type/alouer",
                                "/payment/v1/checkout",
                                "/api/v1/**"
                        ).permitAll()

                        // Swagger
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/v3/api-docs/**"
                        ).permitAll()

                        // =========================
                        // PROPERTY CREATION
                        // =========================

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/biens/create"
                        ).hasAnyRole("EMPLOYE", "ADMIN")

                        // =========================
                        // PROPERTY UPDATE
                        // =========================

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/biens/**"
                        ).hasAnyRole("EMPLOYE", "ADMIN")

                        // =========================
                        // PROPERTY DELETE
                        // =========================

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/biens/delete/**"
                        ).hasAnyRole("EMPLOYE", "ADMIN")

                        // =========================
                        // BLOG ADMINISTRATION
                        // =========================

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/blog/**"
                        ).hasAnyRole("EMPLOYE", "ADMIN")

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/blog/**"
                        ).hasAnyRole("EMPLOYE", "ADMIN")

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/blog/**"
                        ).hasRole("EMPLOYE")

                        // =========================
                        // EVERYTHING ELSE
                        // =========================

                        .anyRequest().authenticated()
                )

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}