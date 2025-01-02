package bcc.SGPR.Services;

import bcc.SGPR.Entities.Item;
import bcc.SGPR.Repositories.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;


    public Item create(Item cliente) {
        return itemRepository.save(cliente);
    }

    public List<Item> read() {
        return itemRepository.findAll();
    }

    public Item update(String id) {
        return itemRepository.findById(id).orElse(null);
    }

    public void delete(String id) {
        itemRepository.deleteById(id);
    }
}