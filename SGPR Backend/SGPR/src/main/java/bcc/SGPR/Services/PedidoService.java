package bcc.SGPR.Services;

import bcc.SGPR.Entities.Pedido;
import bcc.SGPR.Repositories.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;


    public Pedido create(Pedido pedido) {
        return pedidoRepository.save(pedido);
    }

    public List<Pedido> read() {
        return pedidoRepository.findAll();
    }

    public Pedido update(String id) {
        return pedidoRepository.findById(id).orElse(null);
    }

    public void delete(String id) {
        pedidoRepository.deleteById(id);
    }
}