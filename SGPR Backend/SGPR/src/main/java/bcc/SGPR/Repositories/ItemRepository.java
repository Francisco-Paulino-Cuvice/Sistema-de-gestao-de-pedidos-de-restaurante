package bcc.SGPR.Repositories;

import bcc.SGPR.Entities.Item;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ItemRepository extends MongoRepository<Item, String> {
}