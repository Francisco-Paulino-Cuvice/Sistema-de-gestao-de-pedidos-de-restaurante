package bcc.SGPR.Controllers;

import bcc.SGPR.Entities.Cliente;
import bcc.SGPR.Exceptions.ClienteNotFoundException;
import bcc.SGPR.Services.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/cliente")
@RestController
public class ClienteController {
    @Autowired
    private ClienteService clienteService;

    @PostMapping
    public Cliente create(@RequestBody Cliente cliente) {
        return clienteService.create(cliente);
    }

    @GetMapping
    public List<Cliente> read() {
        return clienteService.read();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> read(@PathVariable String id){
        try{
            Cliente cliente = this.clienteService.read(id);
            return new ResponseEntity(cliente, HttpStatus.OK);
        }catch (ClienteNotFoundException cnfe){
            return new ResponseEntity(cnfe.getMessage(),HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cliente> update(@PathVariable String id, @RequestBody Cliente cliente){
        Cliente clienteOriginal = this.clienteService.update(id, cliente);
        return new ResponseEntity(clienteOriginal, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        clienteService.delete(id);
    }
}
