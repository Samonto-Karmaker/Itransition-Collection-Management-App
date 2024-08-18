package com.example.server.controllers;

import com.example.server.models.User;
import com.example.server.models.dto.DefaultResponseDTO;
import com.example.server.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PutMapping("/block/{id}")
    public ResponseEntity<DefaultResponseDTO> blockUser(@PathVariable String id) {
        User user = userService.blockUser(id);
        return ResponseEntity.ok(prepareResponseUser(user));
    }

    @PutMapping("/unblock/{id}")
    public ResponseEntity<DefaultResponseDTO> unblockUser(@PathVariable String id) {
        User user = userService.unblockUser(id);
        return ResponseEntity.ok(prepareResponseUser(user));
    }

    @PutMapping("/promote/{id}")
    public ResponseEntity<DefaultResponseDTO> promoteUser(@PathVariable String id) {
        User user = userService.makeUserAdmin(id);
        return ResponseEntity.ok(prepareResponseUser(user));
    }

    @PutMapping("/demote/{id}")
    public ResponseEntity<DefaultResponseDTO> demoteUser(@PathVariable String id) {
        User user = userService.removeAdminRole(id);
        return ResponseEntity.ok(prepareResponseUser(user));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<DefaultResponseDTO> deleteUser(@PathVariable String id) {
        User user = userService.deleteUser(id);
        return ResponseEntity.ok(prepareResponseUser(user));
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