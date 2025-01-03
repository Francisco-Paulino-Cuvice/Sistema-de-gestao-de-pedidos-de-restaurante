package bcc.SGPR.Entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Document(collection = "Pedidos")
public class Pedido {

    @Id
    private String idPedido;
    private ClientePedido clientePedido;
    private Set<ItensPedido> itensPedido = new HashSet<>();
    private Double valorTotal;
    private String statusPedido;
    private LocalDateTime dataHoraPedido;

    public static class ClientePedido{
        private String clienteId;
        private String clienteNome;
        private String endereco;
        private String telefone;

        public ClientePedido() {
        }

        public String getTelefone() {return telefone;}

        public void setTelefone(String telefone) {this.telefone = telefone;}

        public String getEndereco() {return endereco;}

        public void setEndereco(String endereco) {this.endereco = endereco;}

        public String getClienteNome() {return clienteNome;}

        public void setClienteNome(String clienteNome) {this.clienteNome = clienteNome;}

        public String getClienteId() {return clienteId;}

        public void setClienteId(String clienteId) {this.clienteId = clienteId;}
    }

    public static class ItensPedido{
        private String idItem;
        private int quantidade;
        private double subTotal;

        public ItensPedido() {
        }

        public String getIdItem() {return idItem;}

        public void setIdItem(String idItem) {this.idItem = idItem;}

        public double getSubTotal() {return subTotal;}

        public void setSubTotal(double subTotal) {this.subTotal = subTotal;}

        public int getQuantidade() {return quantidade;}

        public void setQuantidade(int quantidade) {this.quantidade = quantidade;}
    }

    public Pedido() {
    }

    public String getIdPedido() {
        return idPedido;
    }

    public void setIdPedido(String idPedido) {
        this.idPedido = idPedido;
    }

    public ClientePedido getClientePedido() {return clientePedido;}

    public void setClientePedido(ClientePedido clientePedido) {
        this.clientePedido = clientePedido;
    }

    public Set<ItensPedido> getItensPedido() {
        return itensPedido;
    }

    public void setItensPedido(Set<ItensPedido> itensPedido) {
        this.itensPedido = itensPedido;
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
                ", itensPedido=" + itensPedido +
                ", valorTotal=" + valorTotal +
                ", statusPedido='" + statusPedido + '\'' +
                ", dataHoraPedido=" + dataHoraPedido +
                '}';
    }
}
