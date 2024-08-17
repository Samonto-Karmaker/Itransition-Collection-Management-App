package com.example.server.services;

import com.example.server.models.User;
import com.example.server.models.dto.AuthResponseDTO;
import com.example.server.repositories.UserRepository;
import com.example.server.util.JwtUtil;
import org.bson.types.ObjectId;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomUserDetailsService customUserDetailsService;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, CustomUserDetailsService customUserDetailsService, JwtUtil jwtUtil, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.customUserDetailsService = customUserDetailsService;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }

    public User createUser(String username, String email, String password) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("User with email already exists");
        }
        User user = new User(username, email, passwordEncoder.encode(password));
        return userRepository.save(user);
    }

    public AuthResponseDTO loginUser(String email, String password) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            User user = userRepository.findByEmail(email).orElseThrow(
                    () -> new IllegalArgumentException("User not found")
            );

            if (user.isBlocked()) {
                throw new IllegalArgumentException("User is blocked");
            }

            String jwt = jwtUtil.generateToken(customUserDetailsService.loadUserByUsername(email).getUsername());

            Map<String, Object> data = Map.of(
                    "id", user.getId(),
                    "username", user.getUsername(),
                    "email", user.getEmail(),
                    "Admin", user.isAdmin(),
                    "Blocked", user.isBlocked()
            );
            return new AuthResponseDTO(jwt, data);

        } catch (BadCredentialsException e) {
            throw new IllegalArgumentException("Incorrect email or password");
        }
    }

    public Boolean isTokenStillValid(String token) {
        Boolean isTokenExpired = jwtUtil.validateToken(token);
        if (!isTokenExpired) {
            throw new IllegalArgumentException("Token is expired");
        }
        return true;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User blockUser(String id) {
        User user = userRepository.findById(new ObjectId(id)).orElseThrow(
                () -> new IllegalArgumentException("User not found")
        );
        if (user.isBlocked()) {
            throw new IllegalArgumentException("User is already blocked");
        }
        user.setBlocked(true);
        return userRepository.save(user);
    }

    public User unblockUser(String id) {
        User user = userRepository.findById(new ObjectId(id)).orElseThrow(
                () -> new IllegalArgumentException("User not found")
        );
        if (!user.isBlocked()) {
            throw new IllegalArgumentException("User is not blocked");
        }
        user.setBlocked(false);
        return userRepository.save(user);
    }

    public User makeUserAdmin(String id) {
        User user = userRepository.findById(new ObjectId(id)).orElseThrow(
                () -> new IllegalArgumentException("User not found")
        );
        if (user.isAdmin()) {
            throw new IllegalArgumentException("User is already an admin");
        }
        user.setAdmin(true);
        return userRepository.save(user);
    }

    public User removeAdminRole(String id) {
        User user = userRepository.findById(new ObjectId(id)).orElseThrow(
                () -> new IllegalArgumentException("User not found")
        );
        if (!user.isAdmin()) {
            throw new IllegalArgumentException("User is not an admin");
        }
        user.setAdmin(false);
        return userRepository.save(user);
    }

    public String deleteUser(String id) {
        User user = userRepository.findById(new ObjectId(id)).orElseThrow(
                () -> new IllegalArgumentException("User not found")
        );
        userRepository.delete(user);
        return "The User has been deleted";
    }
}
