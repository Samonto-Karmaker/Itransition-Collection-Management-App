package com.example.server.models.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CollectionDTO {
    private String name;
    private String description;
    private String category;
    private Map<String, String> customFields;
}
