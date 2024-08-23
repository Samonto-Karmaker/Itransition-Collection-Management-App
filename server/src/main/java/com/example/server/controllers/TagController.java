package com.example.server.controllers;

import com.example.server.models.Tag;
import com.example.server.models.dto.DefaultResponseDTO;
import com.example.server.services.TagService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tags")
public class TagController {

    private final TagService tagService;

    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @GetMapping("/")
    public ResponseEntity<List<DefaultResponseDTO>> getAllTags() {
        List<Tag> allTags = tagService.getAllTags();
        return ResponseEntity.ok(allTags.stream()
                .map(this::prepareResponseTag)
                .toList());
    }

    private DefaultResponseDTO prepareResponseTag(Tag tag) {
        DefaultResponseDTO response = new DefaultResponseDTO();
        response.getData().put("id", tag.getId());
        response.getData().put("name", tag.getName());
        return response;
    }
}
