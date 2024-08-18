package com.example.server.config;

import com.example.server.filters.JwtRequestFilter;
import com.example.server.filters.UserStatusFilter;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Configuration
@EnableWebSecurity
public class AppConfig {

    JwtRequestFilter jwtRequestFilter;

    public AppConfig(JwtRequestFilter jwtRequestFilter) {
        this.jwtRequestFilter = jwtRequestFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity, UserStatusFilter userStatusFilter) throws Exception {
        httpSecurity.csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .anyRequest().permitAll())
                .exceptionHandling(
                        exception -> exception
                                .authenticationEntryPoint((request, response, e) -> response.sendError(HttpServletResponse.SC_UNAUTHORIZED))
                                .accessDeniedHandler((request, response, e) -> response.sendError(HttpServletResponse.SC_FORBIDDEN))
                )
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterAfter(userStatusFilter, JwtRequestFilter.class);

        return httpSecurity.build();
    }

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
