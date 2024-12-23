package com.gezerkengor.conf;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.gezerkengor.service.security.UserDetailService;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConf {
    
     private final CORSConf corsConf;
     private final JWTFilter JWTFilter;
     private UserDetailService userDetailService;
     
     private PasswordEncoder passwordEncoder(){
            return new BCryptPasswordEncoder();
     }
     
     @Bean
     private AuthenticationProvider authProvider(){
            DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
                                      provider.setUserDetailsService(userDetailService);
                                      provider.setPasswordEncoder(passwordEncoder());
            return provider;
     }
     
     @Bean 
     private AuthenticationManager authManager(AuthenticationConfiguration authConf) throws Exception{
                return authConf.getAuthenticationManager();                    
     } 
 
     
     @Bean
     public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
             return http.csrf(c -> {c.disable();})
                        .authorizeHttpRequests(auth -> {
                             auth.requestMatchers("/api/auth/**").permitAll().anyRequest().authenticated();
                        })
                        .cors(crs -> {
                           crs.configurationSource(corsConf);
                        })
                        .authenticationProvider(authProvider())
                        .addFilterBefore(JWTFilter,UsernamePasswordAuthenticationFilter.class)
                        .build();
           
     }

}
