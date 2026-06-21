package services;

import model.LoginRequest;
import model.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {

    private final String SECRET = "mySecretKey123456";

    public String generateToken(LoginRequest user) {

        return Jwts.builder()
                .setSubject(user.getEmail())
                //.claim("role", user.getIdRole())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 day
                .signWith(SignatureAlgorithm.HS256, SECRET)
                .compact();
    }
}