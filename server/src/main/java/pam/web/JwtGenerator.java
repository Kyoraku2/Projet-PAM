package pam.web;

import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import pam.model.User;

import java.util.Date;

@Component
public class JwtGenerator {
    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    public String generateJwt(User user) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expiration);

        return Jwts.builder()
                .setSubject(Long.toString(user.getUserID()))
                .claim("username", user.getUsername())
                .claim("role", user.getRole())
                .claim("email", user.getEmail())
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(io.jsonwebtoken.SignatureAlgorithm.HS512, secret)
                .compact();
    }
}