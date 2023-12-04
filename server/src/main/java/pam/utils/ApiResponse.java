package pam.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

public class ApiResponse {
    public static final String BAD_REQUEST_DEFAULT = "Bad Request";
    public static final String NOT_FOUND_DEFAULT = "Not Found";
    public static final String INTERNAL_SERVER_ERROR_DEFAULT = "Internal Server Error";
    public static final String UNAUTHORIZED_DEFAULT = "Unauthorized";
    public static final String FORBIDDEN_DEFAULT = "Forbidden";
    public static final String NOT_IMPLEMENTED_DEFAULT = "Not Implemented";

    public static ResponseEntity<Object> customResponse(Object data, HttpStatus status){
        return ResponseEntity.status(status).body(data);
    }

    public static ResponseEntity<Object> ok(Object data){
        return ResponseEntity.ok(data);
    }

    public static ResponseEntity<Object> badRequest(String message){
        return ResponseEntity.badRequest().body(message);
    }

    public static ResponseEntity<Object> badRequest(List<String> messages){
        return ResponseEntity.badRequest().body(messages);
    }

    public static ResponseEntity<Object> badRequest(){
        return ResponseEntity.badRequest().body(BAD_REQUEST_DEFAULT);
    }

    public static ResponseEntity<Object> notFound(String message){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
    }

    public static ResponseEntity<Object> notFound(){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(NOT_FOUND_DEFAULT);
    }

    public static ResponseEntity<Object> internalServerError(String message){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(message);
    }

    public static ResponseEntity<Object> internalServerError(){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(INTERNAL_SERVER_ERROR_DEFAULT);
    }

    public static ResponseEntity<Object> unauthorized(String message){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(message);
    }

    public static ResponseEntity<Object> unauthorized(){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(UNAUTHORIZED_DEFAULT);
    }

    public static ResponseEntity<Object> forbidden(String message){
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(message);
    }

    public static ResponseEntity<Object> forbidden(){
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(FORBIDDEN_DEFAULT);
    }

    public static ResponseEntity<Object> notImplemented(String message){
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(message);
    }

    public static ResponseEntity<Object> notImplemented(){
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(NOT_IMPLEMENTED_DEFAULT);
    }
}
