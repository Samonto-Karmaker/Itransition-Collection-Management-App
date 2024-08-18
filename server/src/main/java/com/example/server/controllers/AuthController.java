package com.example.server.controllers;

import com.example.server.models.dto.AuthResponseDTO;
import com.example.server.models.dto.LoginDTO;
import com.example.server.models.dto.RegisterDTO;
import com.example.server.models.User;
import com.example.server.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDTO registerDTO) {
        User user = userService.createUser(
                registerDTO.getUsername(),
                registerDTO.getEmail(),
                registerDTO.getPassword()
        );
        return ResponseEntity.ok("User created with id: " + user.getId());
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginDTO loginDTO) {
        AuthResponseDTO authResponseDTO = userService.loginUser(
                loginDTO.getEmail(),
                loginDTO.getPassword()
        );
        return ResponseEntity.ok(authResponseDTO);
    }

    @GetMapping("/isTokenStillValid")
    public ResponseEntity<String> isTokenStillValid(@RequestHeader(value = "Authorization", required = false) String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("false");
        }

        token = token.substring(7);
        if (userService.isTokenStillValid(token)) {
            return ResponseEntity.ok("true");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("false");
        }
    }
}