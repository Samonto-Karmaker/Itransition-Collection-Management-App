package com.example.server.services;

import com.example.server.models.Collection;
import com.example.server.models.Item;
import com.example.server.models.Tag;
import com.example.server.repositories.CollectionRepository;
import com.example.server.repositories.ItemRepository;
import com.example.server.repositories.TagRepository;
import com.example.server.util.UserUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class ItemService {

    private final ItemRepository itemRepository;
    private final TagRepository tagRepository;
    private final CollectionRepository collectionRepository;

    public ItemService(ItemRepository itemRepository, TagRepository tagRepository, CollectionRepository collectionRepository) {
        this.itemRepository = itemRepository;
        this.tagRepository = tagRepository;
        this.collectionRepository = collectionRepository;
    }

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public List<Item> getItemsByCollectionId(String collectionId) {
        return itemRepository.findByCollectionId(new ObjectId(collectionId));
    }

    public Item getItemById(String itemId) {
        return itemRepository.findById(new ObjectId(itemId)).orElse(null);
    }

    public String createItem(
            String collectionId,
            String name,
            List<String> tags,
            Map<String, Object> customFields,
            HttpServletRequest request
    ) {
        Collection collection = collectionRepository.findById(new ObjectId(collectionId)).orElseThrow(
                () -> new IllegalArgumentException("Collection not found")
        );
        if (!collection.getUserId().equals(new ObjectId(UserUtil.getCurrentUser(request).getId()))) {
            throw new IllegalArgumentException("You are not authorized to create an item in this collection");
        }

        Item item = new Item();
        item.setCollectionId(new ObjectId(collectionId));
        item.setName(name);
        item.setTags(getTags(tags));
        item.setCustom_fields(customFields);
        item.setLikes(new ArrayList<>());
        item.setCreated_at(new Date());

        itemRepository.save(item);

        return "A new item has been created";
    }

    public String likeItem(String itemId, HttpServletRequest request) {
        ObjectId userId = new ObjectId(UserUtil.getCurrentUser(request).getId());
        Item item = itemRepository.findById(new ObjectId(itemId)).orElseThrow(
                () -> new IllegalArgumentException("Item not found")
        );
        if (item.getLikes().contains(userId)) {
            throw new IllegalArgumentException("You have already liked the item");
        }
        item.getLikes().add(userId);
        itemRepository.save(item);
        return "You liked the item";
    }

    public String unlikeItem(String itemId, HttpServletRequest request) {
        ObjectId userId = new ObjectId(UserUtil.getCurrentUser(request).getId());
        Item item = itemRepository.findById(new ObjectId(itemId)).orElseThrow(
                () -> new IllegalArgumentException("Item not found")
        );
        if (!item.getLikes().contains(userId)) {
            throw new IllegalArgumentException("You have not liked the item yet");
        }
        item.getLikes().remove(userId);
        itemRepository.save(item);
        return "You unliked the item";
    }

    public String deleteItem(String itemId, HttpServletRequest request) {
        if (!isUserAuthorized(itemId, request)) {
            throw new IllegalArgumentException("You are not authorized to delete this item");
        }
        Item item = itemRepository.findById(new ObjectId(itemId)).orElseThrow(
                () -> new IllegalArgumentException("Item not found")
        );
        itemRepository.delete(item);
        return "The item has been deleted";
    }

    private List<ObjectId> getTags(List<String> tags) {
        List<ObjectId> tagIds = new ArrayList<>();
        for(String tag : tags) {
            tag = tag.toLowerCase().replace(" ", "_");
            if (tagRepository.findByName(tag).isPresent()) {
                tagIds.add(new ObjectId(tagRepository.findByName(tag).get().getId()));
            } else {
                Tag newTag = new Tag();
                newTag.setName(tag);
                tagIds.add(new ObjectId(tagRepository.save(newTag).getId()));
            }
        }
        return tagIds;
    }

    private boolean isUserAuthorized(String itemId, HttpServletRequest request) {
        ObjectId userId = new ObjectId(UserUtil.getCurrentUser(request).getId());
        Item item = itemRepository.findById(new ObjectId(itemId)).orElseThrow(
                () -> new IllegalArgumentException("Item not found")
        );
        Collection collection = collectionRepository.findById(item.getCollectionId()).orElseThrow(
                () -> new IllegalArgumentException("Collection not found")
        );
        return collection.getUserId().equals(userId);
    }
}
