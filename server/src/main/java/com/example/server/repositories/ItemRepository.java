package com.example.server.repositories;

import com.example.server.models.Item;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends MongoRepository<Item, ObjectId> {
    List<Item> findByCollectionId(ObjectId collectionId);
}
