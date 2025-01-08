package bcc.SGPR.Controllers;
import org.springframework.web.bind.annotation.CrossOrigin;

import bcc.SGPR.Entities.Item;
import bcc.SGPR.Exceptions.ItemNotFoundException;
import bcc.SGPR.Services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/item")
@RestController
public class ItemController {
    @Autowired
    private ItemService itemService;

    @PostMapping
    public Item create(@RequestBody Item item) {
        return itemService.create(item);
    }

    @GetMapping
    public List<Item> read() {
        return itemService.read();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> read(@PathVariable String id){
        try{
            Item item = this.itemService.read(id);
            return new ResponseEntity(item, HttpStatus.OK);
        }catch (ItemNotFoundException infe){
            return new ResponseEntity(infe.getMessage(),HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> update(@PathVariable String id, @RequestBody Item item){
        Item itemOriginal = this.itemService.update(id, item);
        return new ResponseEntity(itemOriginal, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        itemService.delete(id);
    }
}
