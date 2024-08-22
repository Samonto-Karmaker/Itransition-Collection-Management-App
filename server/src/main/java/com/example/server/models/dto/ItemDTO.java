package com.example.server.models.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemDTO {
    private String id;
    private String collectionId;
    private String name;
    private List<String> tags;
    private Map<String, Object> custom_fields;
    private List<String> likes;
}
