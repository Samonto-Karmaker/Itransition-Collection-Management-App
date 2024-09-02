package com.example.server.repositories;

import com.example.server.models.ApiKey;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ApiKeyRepository extends MongoRepository<ApiKey, ObjectId> {
    Optional<ApiKey> findByApiKey(String apiKey);
}
