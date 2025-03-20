package com.backend.boardMate.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;


//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//
//
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers(HttpMethod.PUT, "/api/properties/**").permitAll() // Allow PUT requests
//                        .anyRequest().permitAll()
//                )
//                .csrf(csrf -> csrf.disable());
//        return http.build();
//    }
//}

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.GET, "/api/properties/**").permitAll() // Allow public access to read properties
                        .requestMatchers(HttpMethod.PUT, "/api/properties/**").authenticated() // Require authentication for updates
                        .anyRequest().authenticated() // Secure all other endpoints
                )
                .csrf(AbstractHttpConfigurer::disable)
                .httpBasic(withDefaults()); // Use HTTP Basic Authentication (or OAuth2, JWT, etc.)
        return http.build();
    }
}