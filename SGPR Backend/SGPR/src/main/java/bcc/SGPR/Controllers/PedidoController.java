package bcc.SGPR.Controllers;

import bcc.SGPR.Entities.Pedido;
import bcc.SGPR.Exceptions.PedidoNotFoundException;
import bcc.SGPR.Services.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/pedido")
@RestController
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @PostMapping
    public Pedido create(@RequestBody Pedido pedido) {
        return pedidoService.create(pedido);
    }

    @GetMapping
    public List<Pedido> read() {
        return pedidoService.read();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pedido> read(@PathVariable String id){
        try{
            Pedido pedido = this.pedidoService.read(id);
            return new ResponseEntity(pedido, HttpStatus.OK);
        }catch (PedidoNotFoundException pnfe){
            return new ResponseEntity(pnfe.getMessage(),HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pedido> update(@PathVariable String id, @RequestBody Pedido pedido){
        Pedido pedidoOriginal = this.pedidoService.update(id, pedido);
        return new ResponseEntity(pedidoOriginal, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        pedidoService.delete(id);
    }
}
