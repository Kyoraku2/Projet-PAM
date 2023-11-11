package pam.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ApiResponse {
    public static ResponseEntity<Object> ok(Object data){
        return ResponseEntity.ok(data);
    }

    public static ResponseEntity<Object> badRequest(String message){
        return ResponseEntity.badRequest().body(message);
    }

    public static ResponseEntity<Object> notFound(String message){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
    }

    public static ResponseEntity<Object> internalServerError(String message){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(message);
    }

    public static ResponseEntity<Object> unauthorized(String message){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(message);
    }

    public static ResponseEntity<Object> forbidden(String message){
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(message);
    }

    public static ResponseEntity<Object> notImplemented(String message){
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(message);
    }
}
