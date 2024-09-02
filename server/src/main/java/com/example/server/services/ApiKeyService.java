package com.example.server.services;

import com.example.server.models.ApiKey;
import com.example.server.models.Collection;
import com.example.server.repositories.ApiKeyRepository;
import com.example.server.repositories.CollectionRepository;
import com.example.server.repositories.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ApiKeyService {

    private final UserRepository userRepository;
    private final ApiKeyRepository apiKeyRepository;
    private final CollectionRepository collectionRepository;

    public ApiKeyService(UserRepository userRepository, ApiKeyRepository apiKeyRepository, CollectionRepository collectionRepository) {
        this.userRepository = userRepository;
        this.apiKeyRepository = apiKeyRepository;
        this.collectionRepository = collectionRepository;
    }

    public String generateApiKey(String userId) {

        ObjectId id = new ObjectId(userId);
        userRepository.findById(id).orElseThrow(
                () -> new RuntimeException("User not found")
        );
        ApiKey apiKey = new ApiKey();
        apiKey.setApiKey(UUID.randomUUID().toString());
        apiKey.setUserId(id);

        apiKeyRepository.save(apiKey);
        return apiKey.getApiKey();
    }

    public List<Collection> getCollectionsByApiKey(String apiKey) {
        ApiKey key = apiKeyRepository.findByApiKey(apiKey).orElseThrow(
                () -> new RuntimeException("Invalid api key")
        );
        List<Collection> collections = collectionRepository.findByUserId(key.getUserId());
        if (collections == null) throw new RuntimeException("No collections found");
        if (collections.isEmpty()) return new ArrayList<>();
        return collections;
    }
}
