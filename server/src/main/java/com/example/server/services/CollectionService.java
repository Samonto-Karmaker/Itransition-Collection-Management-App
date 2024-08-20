package com.example.server.services;

import com.example.server.models.Collection;
import com.example.server.models.User;
import com.example.server.repositories.CollectionRepository;
import com.example.server.util.UserUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class CollectionService {

    private final CollectionRepository collectionRepository;

    public CollectionService(com.example.server.repositories.CollectionRepository collectionRepository) {
        this.collectionRepository = collectionRepository;
    }

    public List<Collection> getAllCollections() {
        return collectionRepository.findAll();
    }

    public List<Collection> getUserCollections(HttpServletRequest request) {
        return collectionRepository.findByUserId(new ObjectId(UserUtil.getCurrentUser(request).getId()));
    }

    public Collection getCollectionById(String collectionId) {
        return collectionRepository.findById(new ObjectId(collectionId)).orElse(null);
    }

    public String createCollection(
            String name,
            String description,
            String category,
            Map<String, String> customFields,
            HttpServletRequest request
    ) {
        Collection collection = new Collection();
        collection.setUserId(new ObjectId(UserUtil.getCurrentUser(request).getId()));
        collection.setName(name);
        collection.setDescription(description);
        collection.setCategory(category);
        collection.setCustom_fields(customFields);
        collection.setCreated_at(new Date());
        collection.setUpdated_at(new Date());

        collectionRepository.save(collection);
        return "Collection created";

    }

    public String deleteCollection(String collectionId, HttpServletRequest request) {
        Collection collection = collectionRepository.findById(new ObjectId(collectionId)).orElse(null);
        User currentUser = UserUtil.getCurrentUser(request);

        if (collection == null) throw new IllegalArgumentException("Collection not found");
        if (!collection.getUserId().toHexString().equals(currentUser.getId()) && !currentUser.isAdmin()) {
            throw new IllegalArgumentException("You are not allowed to delete this collection");
        }

        collectionRepository.deleteById(new ObjectId(collectionId));
        return "Collection deleted";
    }
}
