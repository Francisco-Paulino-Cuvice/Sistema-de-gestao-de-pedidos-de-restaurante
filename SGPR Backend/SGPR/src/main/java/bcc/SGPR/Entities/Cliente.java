package bcc.SGPR.Entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Document(collection = "Clientes")
public class Cliente {

    @Id
    private String clienteId;
    private String clienteNome;
    private String telefone;
    private String email;
    private String endereco;
    private Set<HistoricoPedidos> historicoPedidos = new HashSet<>();

    public static class HistoricoPedidos {
        private String idPedido;
        private LocalDateTime dataHoraPedido;
        private Double valorTotal;

        public HistoricoPedidos() {}

        public HistoricoPedidos(String idPedido, Double valorTotal, LocalDateTime dataHoraPedido) {
            this.idPedido = idPedido;
            this.valorTotal = valorTotal;
            this.dataHoraPedido = dataHoraPedido;
        }

        public String getIdPedido() {return idPedido;}

        public void setIdPedido(String idPedido) {this.idPedido = idPedido;}

        public LocalDateTime getDataHoraPedido() {return dataHoraPedido;}

        public void setDataHoraPedido(LocalDateTime dataHoraPedido) {this.dataHoraPedido = dataHoraPedido;}

        public Double getValorTotal() {return valorTotal;}

        public void setValorTotal(Double valorTotal) {this.valorTotal = valorTotal;}
    }

    public Cliente() {
    }

    public String getClienteId() {
        return clienteId;
    }

    public void setClienteId(String clienteId) {
        this.clienteId = clienteId;
    }

    public String getClienteNome() {
        return clienteNome;
    }

    public void setClienteNome(String clienteNome) {
        this.clienteNome = clienteNome;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public Set<HistoricoPedidos> getHistoricoPedidos() {
        return historicoPedidos;
    }

    public void setHistoricoPedidos(Set<HistoricoPedidos> historicoPedidos) {this.historicoPedidos = historicoPedidos;}

    @Override
    public String toString() {
        return "Cliente{" +
                "clienteId='" + clienteId + '\'' +
                ", clienteNome='" + clienteNome + '\'' +
                ", telefone='" + telefone + '\'' +
                ", email='" + email + '\'' +
                ", endereco='" + endereco + '\'' +
                ", historicoPedidos=" + historicoPedidos +
                '}';
    }
}
