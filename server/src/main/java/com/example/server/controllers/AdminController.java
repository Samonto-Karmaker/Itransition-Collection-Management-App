package com.example.server.controllers;

import com.example.server.models.User;
import com.example.server.models.dto.DefaultResponseDTO;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private DefaultResponseDTO prepareResponseUser(User user) {
        return new DefaultResponseDTO(Map.of(
                "id", user.getId(),
                "username", user.getUsername(),
                "email", user.getEmail(),
                "Admin", user.isAdmin(),
                "Blocked", user.isBlocked()
        ));
    }
}
