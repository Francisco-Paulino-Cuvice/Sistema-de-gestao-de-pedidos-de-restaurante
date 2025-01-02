package bcc.SGPR.Exceptions;

public class PedidoNotFoundException extends RuntimeException {

        public PedidoNotFoundException(String id) {
            super("Pedido id " + id + " não encontrado!");
        }

}
