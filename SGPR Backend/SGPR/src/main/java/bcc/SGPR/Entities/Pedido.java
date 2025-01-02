package bcc.SGPR.Entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Set;

@Document(collection = "Pedidos")
public class Pedido {

    @Id
    private String idPedido;
    private Cliente clientePedido;
    private Set<Item> itens;
    private Double valorTotal;
    private String statusPedido;
    private LocalDateTime dataHoraPedido;

    public Pedido() {
    }

    public String getIdPedido() {
        return idPedido;
    }

    public void setIdPedido(String idPedido) {
        this.idPedido = idPedido;
    }

    public Cliente getClientePedido() {
        return clientePedido;
    }

    public void setClientePedido(Cliente clientePedido) {
        this.clientePedido = clientePedido;
    }

    public Set<Item> getItens() {
        return itens;
    }

    public void setItens(Set<Item> itens) {
        this.itens = itens;
    }

    public Double getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(Double valorTotal) {
        this.valorTotal = valorTotal;
    }

    public String getStatusPedido() {
        return statusPedido;
    }

    public void setStatusPedido(String statusPedido) {
        this.statusPedido = statusPedido;
    }

    public LocalDateTime getDataHoraPedido() {
        return dataHoraPedido;
    }

    public void setDataHoraPedido(LocalDateTime dataHoraPedido) {
        this.dataHoraPedido = dataHoraPedido;
    }

    @Override
    public String toString() {
        return "Pedido{" +
                "idPedido='" + idPedido + '\'' +
                ", clientePedido=" + clientePedido +
                ", itens=" + itens +
                ", valorTotal=" + valorTotal +
                ", statusPedido='" + statusPedido + '\'' +
                ", dataHoraPedido=" + dataHoraPedido +
                '}';
    }
}
