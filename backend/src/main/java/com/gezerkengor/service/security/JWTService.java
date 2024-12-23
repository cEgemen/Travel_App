package com.gezerkengor.service.security;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class JWTService {
    
     @Value("${SECRET_KEY}")
     String SECRET_KEY ;

     @Value("${expiration_time}")
     long expirationTime;

     private SecretKey getSecretKey()
     {
         return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
     } 

     public String generateToken(String email,SecretKey secretKey,long expirationTime , Map<String,Object> extraClaims)
     {
          return Jwts.builder()
                     .setSubject(email)
                     .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                     .setClaims(extraClaims)
                     .signWith(secretKey,SignatureAlgorithm.HS256)
                     .compact();
     }

     public String generateToke(String email)
     {
         return generateToken(email, getSecretKey(), expirationTime,new HashMap<String , Object>());
     } 

     private Claims extractAllClaims(String token)
     {
          return Jwts.parserBuilder()
                     .setSigningKey(getSecretKey())
                     .build()
                     .parseClaimsJws(token)
                     .getBody();
     }

     private <T> T extractClaim(String token , Function<Claims,T> resolver)
     {
        Claims claims = extractAllClaims(token);
        return resolver.apply(claims);
     }

     public String extractEmail(String token)
     {
          return extractClaim(token,Claims::getSubject);
     }

     public Date extractExpirationTime(String token)
     {
         return extractClaim(token,Claims::getExpiration);
     }


     public boolean isValid(String token , String email)
     {
          String extractEmail = extractEmail(token);
          Date extractLastDate = extractExpirationTime(token);
          boolean isEmailMath = extractEmail.equals(email);
          boolean isDateOk = new Date(System.currentTimeMillis()).before(extractLastDate);
          if(isEmailMath && isDateOk)
          {
             return true;
          }
             return false;
     }

}
