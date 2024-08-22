package com.example.server.controllers;

import com.example.server.models.Item;
import com.example.server.models.dto.DefaultResponseDTO;
import com.example.server.models.dto.ItemDTO;
import com.example.server.services.ItemService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<DefaultResponseDTO>> getAllItems() {
        List<Item> allItems = itemService.getAllItems();
        return ResponseEntity.ok(allItems.stream()
                .map(this::prepareResponseItem)
                .toList());
    }

    @GetMapping("/collection/{collectionId}")
    public ResponseEntity<List<DefaultResponseDTO>> getItemsByCollectionId(@PathVariable String collectionId) {
        List<Item> items = itemService.getItemsByCollectionId(collectionId);
        return ResponseEntity.ok(items.stream()
                .map(this::prepareResponseItem)
                .toList());
    }

    @GetMapping("/item/{id}")
    public ResponseEntity<DefaultResponseDTO> getItemById(@PathVariable String id) {
        Item item = itemService.getItemById(id);
        if (item == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(prepareResponseItem(item));
    }

    @PostMapping("/create")
    public ResponseEntity<String> createItem(@RequestBody ItemDTO itemDTO, HttpServletRequest request) {
        String response = itemService.createItem(
                itemDTO.getCollectionId(),
                itemDTO.getName(),
                itemDTO.getTags(),
                itemDTO.getCustom_fields(),
                request
        );
        return ResponseEntity.ok(response);
    }

    @PutMapping("/like/{id}")
    public ResponseEntity<String> likeItem(@PathVariable String id, HttpServletRequest request) {
        String response = itemService.likeItem(id, request);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/unlike/{id}")
    public ResponseEntity<String> unlikeItem(@PathVariable String id, HttpServletRequest request) {
        String response = itemService.unlikeItem(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteItem(@PathVariable String id, HttpServletRequest request) {
        String response = itemService.deleteItem(id, request);
        return ResponseEntity.ok(response);
    }

    private DefaultResponseDTO prepareResponseItem(Item item) {
        return new DefaultResponseDTO(Map.of(
                "id", item.getId(),
                "collectionId", item.getCollectionId(),
                "name", item.getName(),
                "tags", item.getTags(),
                "custom_fields", item.getCustom_fields(),
                "likes", item.getLikes()
        ));
    }
}
