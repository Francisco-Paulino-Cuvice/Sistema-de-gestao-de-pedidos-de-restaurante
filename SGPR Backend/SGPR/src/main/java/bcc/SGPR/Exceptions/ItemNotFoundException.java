package bcc.SGPR.Exceptions;

public class ItemNotFoundException extends RuntimeException {

    public ItemNotFoundException(String id) {
        super("Item id " + id + " não encontrado!");
    }

}
