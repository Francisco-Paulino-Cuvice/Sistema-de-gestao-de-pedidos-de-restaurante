package bcc.SGPR.Entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Set;

@Document(collection = "Itens")
public class Item {

    @Id
    private String idItem;
    private String nomeItem;
    private String descricao;
    private Double precoUnitario;
    private String categoria;
    private Set<String> alergicos;

    public Item() {
    }

    public String getIdItem() {
        return idItem;
    }

    public void setIdItem(String idItem) {
        this.idItem = idItem;
    }

    public String getNomeItem() {
        return nomeItem;
    }

    public void setNomeItem(String nomeItem) {
        this.nomeItem = nomeItem;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Double getPrecoUnitario() {
        return precoUnitario;
    }

    public void setPrecoUnitario(Double precoUnitario) {
        this.precoUnitario = precoUnitario;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public Set<String> getAlergicos() {
        return alergicos;
    }

    public void setAlergicos(Set<String> alergicos) {
        this.alergicos = alergicos;
    }

    @Override
    public String toString() {
        return "Item{" +
                "idItem='" + idItem + '\'' +
                ", nomeItem='" + nomeItem + '\'' +
                ", descricao='" + descricao + '\'' +
                ", precoUnitario=" + precoUnitario +
                ", categoria=" + categoria +
                ", alergicos=" + alergicos +
                '}';
    }
}
