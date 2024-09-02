package com.example.server.controllers;

import com.example.server.models.Collection;
import com.example.server.models.dto.DefaultResponseDTO;
import com.example.server.repositories.ItemRepository;
import com.example.server.repositories.UserRepository;
import com.example.server.services.ApiKeyService;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/api-keys")
public class ApiKeyController {

    private final ApiKeyService apiKeyService;
    private final UserRepository userRepository;
    private final ItemRepository itemRepository;

    public ApiKeyController(ApiKeyService apiKeyService, UserRepository userRepository, ItemRepository itemRepository) {
        this.apiKeyService = apiKeyService;
        this.userRepository = userRepository;
        this.itemRepository = itemRepository;
    }

    @GetMapping("/generate/{userId}")
    public ResponseEntity<String> generateApiKey(@PathVariable String userId) {
        return ResponseEntity.ok(apiKeyService.generateApiKey(userId));
    }

    @GetMapping("/collections/{apiKey}")
    public ResponseEntity<List<DefaultResponseDTO>> getCollectionsByApiKey(@PathVariable String apiKey) {
        return ResponseEntity.ok(apiKeyService.getCollectionsByApiKey(apiKey)
                .stream()
                .map(this::prepareResponseOdooCollection)
                .toList());
    }

    private DefaultResponseDTO prepareResponseOdooCollection(Collection collection) {
        return new DefaultResponseDTO(Map.of(
                "id", collection.getId(),
                "owner", userRepository.findById(collection.getUserId()).isPresent()
                        ? userRepository.findById(collection.getUserId()).get().getUsername()
                        : "Unknown",
                "name", collection.getName(),
                "description", collection.getDescription(),
                "number_of_items", itemRepository.findByCollectionId(new ObjectId(collection.getId())).size(),
                "category", collection.getCategory()
        ));
    }

}
