package bcc.SGPR.Exceptions;

public class ClienteNotFoundException extends RuntimeException {

    public ClienteNotFoundException(String id) {
        super("Cliente id " + id + " não encontrado!");
    }

}
