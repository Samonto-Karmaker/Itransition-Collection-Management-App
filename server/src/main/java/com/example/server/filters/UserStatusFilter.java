package com.example.server.filters;

import com.example.server.models.User;
import com.example.server.repositories.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
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

        String email = ((UserDetails) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal())
                .getUsername();

        User user = userRepository.findByEmail(email).orElseThrow(
                () -> {
                    try {
                        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "User not found");
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                    return new IllegalArgumentException("User not found");
                }
        );

        if (user.isBlocked()) {
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "User is blocked");
            return;
        }

        if (!user.isAdmin() && request.getRequestURI().startsWith("/api/admin")) {
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "User is not an admin");
            return;
        }

        filterChain.doFilter(request, response);
    }
}
