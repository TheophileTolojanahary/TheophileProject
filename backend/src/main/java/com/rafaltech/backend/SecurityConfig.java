package com.rafaltech.backend;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable() // Désactive la protection CSRF si vous n'en avez pas besoin
            .authorizeRequests()
            .anyRequest().permitAll(); // Permet à toutes les requêtes de passer sans authentification
        return http.build();
    }
}
