package bcc.SGPR.Repositories;

import bcc.SGPR.Entities.Pedido;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PedidoRepository extends MongoRepository<Pedido, String> {
}