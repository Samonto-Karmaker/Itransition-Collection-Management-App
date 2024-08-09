package com.example.server.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "arbitrary_collections")
public class Collection {

    @Id
    private String id;
    private String userId;
    private String name;
    private String description;
    private String category;
    private Map<String, String> custom_fields; // Field name and type
    private Date created_at;
    private Date updated_at;

}
