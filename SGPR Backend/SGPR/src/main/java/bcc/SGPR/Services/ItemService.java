package bcc.SGPR.Services;

import bcc.SGPR.Entities.Item;
import bcc.SGPR.Exceptions.ItemNotFoundException;
import bcc.SGPR.Repositories.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;


    public Item create(Item item) {
        this.itemRepository.save(item);
        return item;
    }

    public List<Item> read() {
        return itemRepository.findAll();
    }

    public Item read(String id) throws ItemNotFoundException {
        Optional opt = this.itemRepository.findById(id);
        if(!opt.isPresent()){
            throw new ItemNotFoundException(id);
        }
        return (Item)opt.get();
    }

    public Item update(String id, Item item) throws ItemNotFoundException{
        Item itemOriginal = read(id);
        itemOriginal.setNomeItem(item.getNomeItem());
        itemOriginal.setDescricao(item.getDescricao());
        itemOriginal.setAlergicos(item.getAlergicos());
        itemOriginal.setCategoria(item.getCategoria());
        itemOriginal.setPrecoUnitario(item.getPrecoUnitario());

        this.itemRepository.save(itemOriginal);
        return itemOriginal;
    }

    public void delete(String id) {
        if(!this.itemRepository.existsById(id)){
            throw new ItemNotFoundException(id);
        }
        this.itemRepository.deleteById(id);
    }
}