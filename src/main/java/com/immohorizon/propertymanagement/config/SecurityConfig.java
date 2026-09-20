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

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter
    ){
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }


    @Bean
    SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())

                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                .authorizeHttpRequests(auth -> auth

                        // Public endpoints
                        .requestMatchers("/api/auth/**",
                                "api/blog/all",
                                "/api/biens/**",
                                "/api/biens/search",
                                "/api/biens/type/avendre",
                                "/api/biens/type/alouer",
                                "/payment/v1/checkout",
                                "/api/v1/**")
                        .permitAll()
                        // Public access to Swagger/OpenAPI documentation
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/v3/api-docs/**"
                        )
                        .permitAll()

                        // Visitors can see properties
                        .requestMatchers(HttpMethod.GET, "/api/bien/**")
                        .permitAll()


                        // Agents and admins can create properties
                        .requestMatchers(HttpMethod.POST, "/api/bien/**","/api/blog/**")
                        .hasAnyRole("EMPLOYE", "ADMIN")


                        // Agents and admins can update properties
                        .requestMatchers(HttpMethod.PUT, "/api/bien/**","/api/blog/**")
                        .hasAnyRole("EMPLOYE", "ADMIN")


                        // Agents and admins can delete properties
                        .requestMatchers(HttpMethod.DELETE, "/api/bien/delete/**")
                        .hasAnyRole("EMPLOYE", "ADMIN")
                        // Agents and admins can delete properties
                        .requestMatchers(HttpMethod.DELETE, "/api/blog/**")
                        .hasAnyRole("EMPLOYE")


                        // Everything else requires authentication
                        .anyRequest()
                        .authenticated()

                );


        return http.addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
        ).build();
    }
}