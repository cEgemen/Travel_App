package com.gezerkengor.conf;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.gezerkengor.service.security.JWTService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {

    private final JWTService JWTServie;
    private final UserDetailsService userDetailsService; 

    @Override
    protected void doFilterInternal( @SuppressWarnings("null") HttpServletRequest request, @SuppressWarnings("null") HttpServletResponse response, @SuppressWarnings("null") FilterChain filterChain)
            throws ServletException, IOException {
         
           String headerAuthorization = request.getHeader("Authorization");
           if(headerAuthorization == null)
           {
               filterChain.doFilter(request, response);
               return;
           }
           else{
            String[] headerAuthorizationParts =  headerAuthorization.split(" ");           
            if(headerAuthorizationParts.length != 2 || !headerAuthorizationParts[0].equals("Bearer"))
            {
                filterChain.doFilter(request, response);  
                return; 
            }
            String token  = headerAuthorizationParts[1];
            String email  = JWTServie.extractEmail(token);
            if(email != null && SecurityContextHolder.getContext().getAuthentication() == null)
            {
                UserDetails user = userDetailsService.loadUserByUsername(email);
                if(JWTServie.isValid(token, email))
                {
                     UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(user,null);
                                                         authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                     SecurityContextHolder.getContext().setAuthentication(authToken);
                     filterChain.doFilter(request, response);
                     return;                                    
                }
            }
          
        }
    }

    
    
}
