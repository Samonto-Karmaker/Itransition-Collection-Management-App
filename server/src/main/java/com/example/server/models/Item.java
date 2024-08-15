package com.example.server.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "items")
public class Item {

    @Id
    private ObjectId id;
    private ObjectId collectionId;
    private String name;
    private List<ObjectId> tags; // List of tag ids
    private Map<String, Object> custom_fields; // Field name and value
    private List<ObjectId> likes; // List of user ids

}
