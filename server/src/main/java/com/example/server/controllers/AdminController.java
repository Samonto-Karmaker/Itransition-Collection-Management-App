package com.example.server.controllers;

import com.example.server.models.User;
import com.example.server.models.dto.DefaultResponseDTO;
import com.example.server.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<DefaultResponseDTO>> getUsers() {
        List<User> allUsers = userService.getAllUsers();
        List<DefaultResponseDTO> data = allUsers.stream()
                .map(this::prepareResponseUser)
                .toList();
        return ResponseEntity.ok(data);
    }

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
