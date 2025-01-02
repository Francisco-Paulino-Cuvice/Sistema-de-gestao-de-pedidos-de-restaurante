package bcc.SGPR.Services;

import bcc.SGPR.Entities.Cliente;
import bcc.SGPR.Repositories.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;


    public Cliente create(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public List<Cliente> read() {
        return clienteRepository.findAll();
    }

    public Cliente update(String id) {
        return clienteRepository.findById(id).orElse(null);
    }

    public void delete(String id) {
        clienteRepository.deleteById(id);
    }
}