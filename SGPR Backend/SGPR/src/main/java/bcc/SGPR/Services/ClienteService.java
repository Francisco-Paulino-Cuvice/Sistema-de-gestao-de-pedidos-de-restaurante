package bcc.SGPR.Services;

import bcc.SGPR.Entities.Cliente;
import bcc.SGPR.Exceptions.ClienteNotFoundException;
import bcc.SGPR.Repositories.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;


    public Cliente create(Cliente cliente) {
        this.clienteRepository.save(cliente);
        return cliente;
    }

    public List<Cliente> read() {
        return clienteRepository.findAll();
    }

    public Cliente read(String id) throws ClienteNotFoundException {
        Optional opt = this.clienteRepository.findById(id);
        if(!opt.isPresent()){
            throw new ClienteNotFoundException(id);
        }
        return (Cliente)opt.get();
    }

    public Cliente update(String id, Cliente cliente) throws ClienteNotFoundException{
        Cliente clienteOriginal = read(id);
        clienteOriginal.setClienteNome(cliente.getClienteNome());
        clienteOriginal.setEmail(cliente.getEmail());
        clienteOriginal.setEndereco(cliente.getEndereco());
        clienteOriginal.setHistorico(cliente.getHistorico());
        clienteOriginal.setTelefone(cliente.getTelefone());

        this.clienteRepository.save(clienteOriginal);
        return clienteOriginal;
    }

    public void delete(String id) {
        if(!this.clienteRepository.existsById(id)){
            throw new ClienteNotFoundException(id);
        }
        this.clienteRepository.deleteById(id);
    }
}