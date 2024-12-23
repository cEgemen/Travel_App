package com.gezerkengor.conf;

import java.util.List;

import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import jakarta.servlet.http.HttpServletRequest;

@Component
public class CORSConf implements CorsConfigurationSource {

    @Override
    @Nullable
    public CorsConfiguration getCorsConfiguration(@SuppressWarnings("null") HttpServletRequest request) {
        CorsConfiguration cors = new CorsConfiguration();
                          cors.setAllowedMethods(List.of("OPTIONS","GET","POST","DELETE","POST"));;
                          cors.setAllowedHeaders(List.of("Content-Type","Authorization"));
                          cors.setAllowedOrigins(List.of("*"));
                   return cors;
    }
      
}
