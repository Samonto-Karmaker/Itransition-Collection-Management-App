package com.example.server.controllers;

import com.example.server.models.Collection;
import com.example.server.models.Item;
import com.example.server.models.dto.CollectionDTO;
import com.example.server.models.dto.DefaultResponseDTO;
import com.example.server.services.CollectionService;
import com.example.server.services.ItemService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/collections")
public class CollectionController {

    private final CollectionService collectionService;
    private final ItemService itemService;

    public CollectionController(CollectionService collectionService, ItemService itemService) {
        this.collectionService = collectionService;
        this.itemService = itemService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<DefaultResponseDTO>> getAllCollections() {
        List<Collection> allCollections = collectionService.getAllCollections();
        List<DefaultResponseDTO> data = allCollections.stream()
                .map(this::prepareResponseCollection)
                .toList();
        return ResponseEntity.ok(data);
    }

    @GetMapping("/user")
    public ResponseEntity<List<DefaultResponseDTO>> getUserCollections(HttpServletRequest request) {
        List<Collection> userCollections = collectionService.getUserCollections(request);
        List<DefaultResponseDTO> data = userCollections.stream()
                .map(this::prepareResponseCollection)
                .toList();
        return ResponseEntity.ok(data);
    }

    @GetMapping("/collection/{id}")
    public ResponseEntity<DefaultResponseDTO> getCollectionById(@PathVariable String id) {
        Collection collection = collectionService.getCollectionById(id);
        if (collection == null) {
            return ResponseEntity.notFound().build();
        }
        List<Item> items = itemService.getItemsByCollectionId(id);
        DefaultResponseDTO response = prepareResponseCollection(collection);
        response.getData().put("items", items.stream()
                .map(item -> Map.of(
                        "id", item.getId(),
                        "name", item.getName(),
                        "tags", item.getTags(),
                        "custom_fields", item.getCustom_fields(),
                        "likes", item.getLikes(),
                        "created_at", item.getCreated_at()
                ))
                .toList()
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createCollection(@RequestBody CollectionDTO collectionDTO, HttpServletRequest request) {
        String response = collectionService.createCollection(
                collectionDTO.getName(),
                collectionDTO.getDescription(),
                collectionDTO.getCategory(),
                collectionDTO.getCustomFields(),
                request
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCollection(@PathVariable String id, HttpServletRequest request) {
        String response = collectionService.deleteCollection(id, request);
        return ResponseEntity.ok(response);
    }

    private DefaultResponseDTO prepareResponseCollection(Collection collection) {
        return new DefaultResponseDTO(Map.of(
                "id", collection.getId(),
                "userId", collection.getUserId().toHexString(),
                "name", collection.getName(),
                "description", collection.getDescription(),
                "category", collection.getCategory(),
                "custom_fields", collection.getCustom_fields(),
                "created_at", collection.getCreated_at(),
                "updated_at", collection.getUpdated_at()
        ));
    }
}
