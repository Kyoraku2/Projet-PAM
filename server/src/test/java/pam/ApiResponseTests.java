package pam;

import org.junit.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import pam.utils.ApiResponse;

import static org.junit.Assert.*;

public class ApiResponseTests {
    @Test
    public void testCustomResponse(){
        ResponseEntity<Object> response = ApiResponse.customResponse("test", HttpStatus.OK);
        assertNotNull(response);
        assertTrue(response.getStatusCode().is2xxSuccessful());
        assertEquals("test", response.getBody());
    }

    @Test
    public void testOk(){
        ResponseEntity<Object> response = ApiResponse.ok("test");
        assertNotNull(response);
        assertTrue(response.getStatusCode().is2xxSuccessful());
        assertEquals("test", response.getBody());
    }

    @Test
    public void testBadRequest__withMessage(){
        ResponseEntity<Object> response = ApiResponse.badRequest("test");
        assertTrue(response.getStatusCode().is4xxClientError());
        assertEquals("test", response.getBody());
        assertNotNull(response);
    }

    @Test
    public void testBadRequest__default(){
        ResponseEntity<Object> response = ApiResponse.badRequest();
        assertTrue(response.getStatusCode().is4xxClientError());
        assertEquals(ApiResponse.BAD_REQUEST_DEFAULT, response.getBody());
        assertNotNull(response);
    }

    @Test
    public void testNotFound__withMessage(){
        ResponseEntity<Object> response = ApiResponse.notFound("test");
        assertTrue(response.getStatusCode().is4xxClientError());
        assertEquals("test", response.getBody());
        assertNotNull(response);
    }

    @Test
    public void testNotFound__default(){
        ResponseEntity<Object> response = ApiResponse.notFound();
        assertTrue(response.getStatusCode().is4xxClientError());
        assertEquals(ApiResponse.NOT_FOUND_DEFAULT, response.getBody());
        assertNotNull(response);
    }

    @Test
    public void testInternalServerError__withMessage(){
        ResponseEntity<Object> response = ApiResponse.internalServerError("test");
        assertTrue(response.getStatusCode().is5xxServerError());
        assertEquals("test", response.getBody());
        assertNotNull(response);
    }

    @Test
    public void testInternalServerError__default(){
        ResponseEntity<Object> response = ApiResponse.internalServerError();
        assertTrue(response.getStatusCode().is5xxServerError());
        assertEquals(ApiResponse.INTERNAL_SERVER_ERROR_DEFAULT, response.getBody());
        assertNotNull(response);
    }

    @Test
    public void testUnauthorized__withMessage(){
        ResponseEntity<Object> response = ApiResponse.unauthorized("test");
        assertTrue(response.getStatusCode().is4xxClientError());
        assertEquals("test", response.getBody());
        assertNotNull(response);
    }

    @Test
    public void testUnauthorized__default(){
        ResponseEntity<Object> response = ApiResponse.unauthorized();
        assertTrue(response.getStatusCode().is4xxClientError());
        assertEquals(ApiResponse.UNAUTHORIZED_DEFAULT, response.getBody());
        assertNotNull(response);
    }

    @Test
    public void testForbidden__withMessage(){
        ResponseEntity<Object> response = ApiResponse.forbidden("test");
        assertTrue(response.getStatusCode().is4xxClientError());
        assertEquals("test", response.getBody());
        assertNotNull(response);
    }

    @Test
    public void testForbidden__default(){
        ResponseEntity<Object> response = ApiResponse.forbidden();
        assertTrue(response.getStatusCode().is4xxClientError());
        assertEquals(ApiResponse.FORBIDDEN_DEFAULT, response.getBody());
        assertNotNull(response);
    }

    @Test
    public void testNotImplemented__withMessage(){
        ResponseEntity<Object> response = ApiResponse.notImplemented("test");
        assertTrue(response.getStatusCode().is5xxServerError());
        assertEquals("test", response.getBody());
        assertNotNull(response);
    }

    @Test
    public void testNotImplemented__default(){
        ResponseEntity<Object> response = ApiResponse.notImplemented();
        assertTrue(response.getStatusCode().is5xxServerError());
        assertEquals(ApiResponse.NOT_IMPLEMENTED_DEFAULT, response.getBody());
        assertNotNull(response);
    }
}
