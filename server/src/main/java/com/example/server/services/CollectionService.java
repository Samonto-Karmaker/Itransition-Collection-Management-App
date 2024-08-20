package com.example.server.services;

import com.example.server.models.Collection;
import com.example.server.repositories.CollectionRepository;
import com.example.server.util.UserUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public String createCollection(Collection collection) {
        collectionRepository.save(collection);
        return "Collection created";
    }

    public String deleteCollection(String collectionId) {
        collectionRepository.deleteById(new ObjectId(collectionId));
        return "Collection deleted";
    }
}
