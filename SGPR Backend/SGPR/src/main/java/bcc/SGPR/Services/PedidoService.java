package bcc.SGPR.Services;

import bcc.SGPR.Entities.Cliente;
import bcc.SGPR.Entities.Item;
import bcc.SGPR.Entities.Pedido;
import bcc.SGPR.Exceptions.PedidoNotFoundException;
import bcc.SGPR.Repositories.ClienteRepository;
import bcc.SGPR.Repositories.ItemRepository;
import bcc.SGPR.Repositories.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ClienteRepository clienteRepository;
    private final ItemRepository itemRepository;

    @Autowired
    public PedidoService(PedidoRepository pedidoRepository,
                         ClienteRepository clienteRepository,
                         ItemRepository itemRepository) {
        this.pedidoRepository = pedidoRepository;
        this.clienteRepository = clienteRepository;
        this.itemRepository = itemRepository;
    }

    private double calcularSubTotal(String idItem, int quantidade) {
        Item item = itemRepository.findById(idItem)
                .orElseThrow(() -> new RuntimeException("Item não encontrado: " + idItem));
        return item.getPrecoUnitario() * quantidade;
    }


    public Pedido create(Pedido pedido) {

        Cliente cliente = clienteRepository.findById(pedido.getClientePedido().getClienteId())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        Pedido.ClientePedido clientePedido = new Pedido.ClientePedido();
        clientePedido.setClienteId(cliente.getClienteId());
        clientePedido.setClienteNome(cliente.getClienteNome());
        clientePedido.setEndereco(cliente.getEndereco());
        clientePedido.setTelefone(cliente.getTelefone());
        pedido.setClientePedido(clientePedido);

        Set<Pedido.ItensPedido> itensPedido = pedido.getItensPedido().stream()
                .map(item -> {
                    Pedido.ItensPedido itemPedido = new Pedido.ItensPedido();
                    itemPedido.setIdItem(item.getIdItem());
                    itemPedido.setQuantidade(item.getQuantidade());
                    itemPedido.setSubTotal(calcularSubTotal(item.getIdItem(), item.getQuantidade()));
                    return itemPedido;
                })
                .collect(Collectors.toSet());
        pedido.setItensPedido(itensPedido);

        double valorTotal = pedido.getItensPedido().stream()
                .mapToDouble(Pedido.ItensPedido::getSubTotal)
                .sum();
        pedido.setValorTotal(valorTotal);

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
        pedidoOriginal.setItensPedido(pedido.getItensPedido());
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