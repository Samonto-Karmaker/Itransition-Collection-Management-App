package com.example.server.repositories;

import com.example.server.models.Collection;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CollectionRepository extends MongoRepository<Collection, ObjectId> {
    List<Collection> findByUserId(ObjectId userId);
}