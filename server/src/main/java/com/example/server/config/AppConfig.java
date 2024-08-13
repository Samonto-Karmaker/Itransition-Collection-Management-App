package com.example.server.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Configuration
@EnableWebSecurity
public class AppConfig {

    private CorsConfigurationSource corsConfigurationSource() {
        return exchange -> {
            CorsConfiguration cfg = new CorsConfiguration();
            cfg.setAllowedOrigins(Arrays.asList(
                    "http://localhost:3000",
                    "https://itransition-collection-management-app.onrender.com"
            ));
            cfg.setAllowedMethods(Collections.singletonList("*"));
            cfg.setAllowCredentials(true);
            cfg.setAllowedHeaders(Arrays.asList(
                    "Content-Type", "Authorization"
            ));
            cfg.setExposedHeaders(Arrays.asList(
                    "Authorization"
            ));
            cfg.setMaxAge(3600L);

            return cfg;
        };
    }

}
