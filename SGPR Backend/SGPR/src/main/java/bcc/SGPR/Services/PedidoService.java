package bcc.SGPR.Services;

import bcc.SGPR.Entities.Pedido;
import bcc.SGPR.Exceptions.PedidoNotFoundException;
import bcc.SGPR.Repositories.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;


    public Pedido create(Pedido pedido) {
        this.pedidoRepository.save(pedido);
        return pedido;
    }

    public List<Pedido> read() {
        return pedidoRepository.findAll();
    }

    public Pedido read(String id) throws PedidoNotFoundException {
        Optional opt = this.pedidoRepository.findById(id);
        if(!opt.isPresent()){
            throw new PedidoNotFoundException(id);
        }
        return (Pedido)opt.get();
    }

    public Pedido update(String id, Pedido pedido) throws PedidoNotFoundException{
        Pedido pedidoOriginal = read(id);
        pedidoOriginal.setClientePedido(pedido.getClientePedido());
        pedidoOriginal.setStatusPedido(pedido.getStatusPedido());
        pedidoOriginal.setDataHoraPedido(pedido.getDataHoraPedido());
        pedidoOriginal.setItens(pedido.getItens());
        pedidoOriginal.setValorTotal(pedido.getValorTotal());
        this.pedidoRepository.save(pedidoOriginal);
        return pedidoOriginal;
    }

    public void delete(String id) {
        if(!this.pedidoRepository.existsById(id)){
            throw new PedidoNotFoundException(id);
        }
        this.pedidoRepository.deleteById(id);
    }
}