package bcc.SGPR.Entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Set;

@Document(collection = "Clientes")
public class Cliente {

    @Id
    private String clienteId;
    private String clienteNome;
    private String telefone;
    private String email;
    private String endereco;
    private Set<Item> historico;

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

    public Set<Item> getHistorico() {
        return historico;
    }

    public void setHistorico(Set<Item> historico) {
        this.historico = historico;
    }

    @Override
    public String toString() {
        return "Cliente{" +
                "clienteId='" + clienteId + '\'' +
                ", clienteNome='" + clienteNome + '\'' +
                ", telefone='" + telefone + '\'' +
                ", email='" + email + '\'' +
                ", endereco='" + endereco + '\'' +
                ", historico=" + historico +
                '}';
    }
}
