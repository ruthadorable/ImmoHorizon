package com.immohorizon.propertymanagement.services;

import com.immohorizon.propertymanagement.model.LoginRequest;

import com.immohorizon.propertymanagement.model.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    public String generateToken(User user) {

        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("role", user.getRole())
                .setIssuedAt(new Date())
                .setExpiration(
                        new Date(
                                System.currentTimeMillis() + 86400000
                        )
                )
                .signWith(
                        Keys.hmacShaKeyFor(
                                secret.getBytes()
                        )
                )
                .compact();
    }

    public String extractEmail(String token){

        return Jwts.parser()
                .verifyWith(
                        Keys.hmacShaKeyFor(
                                secret.getBytes(StandardCharsets.UTF_8)
                        )
                )
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }


}