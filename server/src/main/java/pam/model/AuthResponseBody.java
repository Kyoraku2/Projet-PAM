package pam.model;

import com.google.gson.Gson;

public class AuthResponseBody {
    private String username;
    private String email;
    private long id;
    private String jwt;

    
    public AuthResponseBody(String username, String email, long id, String jwt) {
        this.username = username;
        this.email = email;
        this.id = id;
        this.jwt = jwt;
    }

    public AuthResponseBody(User user, String jwt) {
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.id = user.getUserID();
        this.jwt = jwt;
    }
    
    
    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public long getId() {
        return id;
    }

    public String getJwt() {
        return jwt;
    }

    public String toString(){
        return "Username: " + username + ", Email: " + email + ", ID: " + id + ", JWT: " + jwt;
    }

    public static AuthResponseBody fromJson(String json) {
        return new Gson().fromJson(json, AuthResponseBody.class); 
    }
}
