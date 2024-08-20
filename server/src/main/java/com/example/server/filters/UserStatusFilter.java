package com.example.server.filters;

import com.example.server.models.User;
import com.example.server.repositories.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class UserStatusFilter extends OncePerRequestFilter {
    private final UserRepository userRepository;

    public UserStatusFilter(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String email = authentication.getName();
            User user = userRepository.findByEmail(email).orElseThrow(
                    () -> new IllegalArgumentException("User not found")
            );

            if (user.isBlocked()) {
                throw new IllegalArgumentException("User is blocked");
            }

            if (!user.isAdmin() && request.getRequestURI().startsWith("/api/admin")) {
                throw new IllegalArgumentException("User is not an admin");
            }

            request.setAttribute("user", user);
        }

        filterChain.doFilter(request, response);
    }
}
