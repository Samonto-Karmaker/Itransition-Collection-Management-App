package com.example.server.repositories;

import com.example.server.models.Tag;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TagRepository extends MongoRepository<Tag, ObjectId> {
    Optional<Tag> findByName(String name);
}
