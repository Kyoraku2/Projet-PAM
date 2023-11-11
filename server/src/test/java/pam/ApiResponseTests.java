package pam;

import org.junit.Test;
import pam.utils.ApiResponse;

import static org.junit.Assert.*;

public class ApiResponseTests {

    @Test
    public void testOk(){
        assertTrue(ApiResponse.ok("test").getStatusCode().is2xxSuccessful());
        assertEquals("test", ApiResponse.ok("test").getBody());
        assertEquals(1, ApiResponse.ok(1).getBody());
        assertNotNull(ApiResponse.ok("test"));
    }

    @Test
    public void testBadRequest(){
        assertTrue(ApiResponse.badRequest("test").getStatusCode().is4xxClientError());
        assertEquals("test", ApiResponse.badRequest("test").getBody());
        assertNotNull(ApiResponse.badRequest("test"));
    }

    @Test
    public void testNotFound(){
        assertTrue(ApiResponse.notFound("test").getStatusCode().is4xxClientError());
        assertEquals("test", ApiResponse.notFound("test").getBody());
        assertNotNull(ApiResponse.notFound("test"));
    }

    @Test
    public void testInternalServerError(){
        assertTrue(ApiResponse.internalServerError("test").getStatusCode().is5xxServerError());
        assertEquals("test", ApiResponse.internalServerError("test").getBody());
        assertNotNull(ApiResponse.internalServerError("test"));
    }

    @Test
    public void testUnauthorized(){
        assertTrue(ApiResponse.unauthorized("test").getStatusCode().is4xxClientError());
        assertEquals("test", ApiResponse.unauthorized("test").getBody());
        assertNotNull(ApiResponse.unauthorized("test"));
    }

    @Test
    public void testForbidden(){
        assertTrue(ApiResponse.forbidden("test").getStatusCode().is4xxClientError());
        assertEquals("test", ApiResponse.forbidden("test").getBody());
        assertNotNull(ApiResponse.forbidden("test"));
    }

    @Test
    public void testNotImplemented(){
        assertTrue(ApiResponse.notImplemented("test").getStatusCode().is5xxServerError());
        assertEquals("test", ApiResponse.notImplemented("test").getBody());
        assertNotNull(ApiResponse.notImplemented("test"));
    }
}
