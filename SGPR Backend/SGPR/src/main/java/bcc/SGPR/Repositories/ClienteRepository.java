package bcc.SGPR.Repositories;

import bcc.SGPR.Entities.Cliente;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ClienteRepository extends MongoRepository<Cliente, String> {
}