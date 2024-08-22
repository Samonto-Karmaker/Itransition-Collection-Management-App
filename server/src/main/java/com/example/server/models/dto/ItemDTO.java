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
    String id;
    String collectionId;
    String name;
    List<String> tags;
    Map<String, Object> custom_fields;
    List<String> likes;
}
