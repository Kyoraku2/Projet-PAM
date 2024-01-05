package pam.model;

import com.google.gson.Gson;

public class UserRequestBody {
    private String username;
    private String password;
    private String email;
    private String description;
    private double latitude;
    private double longitude;
    
    public UserRequestBody(User user) {
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.email = user.getEmail();
        this.description = user.getDescription();
        this.latitude = user.getLatitude();
        this.longitude = user.getLongitude();
    }

    public UserRequestBody(String username, String password, String email, String description, double latitude, double longitude) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.description = description;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    // Getters
    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
         return email; 
    }

    public String getDescription() {
        return description;
    }

    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    // Setters
    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
         this.password = password; 
    }

    public void setEmail(String email) {
         this.email = email; 
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setLatitude(double latitude) {
         this.latitude = latitude; 
    }

    public void setLongitude(double longitude) {
         this.longitude = longitude; 
    }

    public String toString() {
        return "UserRequestBody{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", description='" + description + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                '}';
    }

    public static UserRequestBody fromJson(String json) {
        return new Gson().fromJson(json, UserRequestBody.class); 
    }
}
